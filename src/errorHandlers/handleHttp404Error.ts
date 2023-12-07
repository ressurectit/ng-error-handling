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
    const notifications: Notifications = options.injector.get(CLIENT_ERROR_NOTIFICATIONS);
    const behavior: CatchHttpClientErrorBehavior = options.behavior ?? CatchHttpClientErrorBehavior.Throw;

    const message = options?.messages?.[error.statusCode];

    //show custom error message if available and no received messages available
    if(message && (!error.errors.length || options?.forceCustomMessageDisplay))
    {
        notifications.error(message);
    }

    //show client errors
    if(!options.skipErrorNotifications && notifications)
    {
        for(const clientError of error.errors)
        {
            notifications.error(clientError);
        }
    }

    return applyBehavior(new HttpNotFoundError(error.errors, error.validationErrors, error.response), behavior);
}
