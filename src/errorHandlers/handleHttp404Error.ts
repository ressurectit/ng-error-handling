import {Notifications} from '@anglr/common';

import {HttpClientError} from '../misc/classes/httpClientError';
import {CatchHttpClientErrorOptions} from '../interfaces';
import {CLIENT_ERROR_NOTIFICATIONS} from '../misc/tokens';
import {CatchHttpClientErrorBehavior} from '../misc/enums';
import {applyBehavior} from '../misc/utils';
import {HttpNotFoundError} from '../misc/classes/httpNotFoundError';

/**
 * Custom handler for http 404 status codes
 * @param error - Instance of http client error with all info
 * @param options - Options with customization parameters
 */
export function handleHttp404Error(error: HttpClientError, options: CatchHttpClientErrorOptions): HttpNotFoundError|null
{
    const notifications: Notifications|null = options.injector.get(CLIENT_ERROR_NOTIFICATIONS, null, {optional: true});
    const behavior: CatchHttpClientErrorBehavior = options.configs?.[error.statusCode]?.behavior ?? options.behavior ?? CatchHttpClientErrorBehavior.Throw;

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

    return applyBehavior(new HttpNotFoundError(error.errors, error.validationErrors, error.response), behavior);
}
