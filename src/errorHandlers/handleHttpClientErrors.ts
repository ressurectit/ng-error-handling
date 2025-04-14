import {Notifications} from '@anglr/common';

import {HttpClientError} from '../misc/classes/httpClientError';
import {CatchHttpClientErrorOptions} from '../interfaces';
import {CLIENT_ERROR_NOTIFICATIONS} from '../misc/tokens';
import {ServerValidationService} from '../services';
import {CatchHttpClientErrorBehavior} from '../misc/enums';
import {applyBehavior} from '../misc/utils';

/**
 * Handles http client errors according provided options
 * @param error - Instance of `HttpClientError`
 * @param options - Options used for handling errors
 */
export async function handleHttpClientErrors(error: HttpClientError, options: CatchHttpClientErrorOptions): Promise<HttpClientError|null>
{
    const notifications: Notifications|null = options.injector.get(CLIENT_ERROR_NOTIFICATIONS, null, {optional: true});
    const behavior: CatchHttpClientErrorBehavior = options.configs?.[error.statusCode]?.behavior ?? options.behavior ?? CatchHttpClientErrorBehavior.Suppress;
    const customHandler = options.handlers?.[error.statusCode];

    if(customHandler)
    {
        return await customHandler(error, options);
    }

    //show server validations errors
    if(!(options.configs?.[error.statusCode]?.skipServerValidationErrors ?? options.skipServerValidationErrors) && error.validationErrors)
    {
        options.injector?.get(ServerValidationService).addServerValidationErrors(error.validationErrors);
    }

    const message = options.configs?.[error.statusCode]?.message;

    //show custom error message if available and no received messages available
    if(notifications && message && (!error.errors.length || (options.configs?.[error.statusCode]?.forceCustomMessageDisplay ?? options.forceCustomMessageDisplay)))
    {
        notifications.error(message);
    }

    //show client errors
    if(!(options.configs?.[error.statusCode]?.skipErrorNotifications ?? options.skipErrorNotifications) && notifications)
    {
        for(const clientError of error.errors)
        {
            notifications.error(clientError);
        }
    }

    return applyBehavior(error, behavior);
}
