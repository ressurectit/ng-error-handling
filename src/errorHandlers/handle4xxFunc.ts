import {HttpErrorResponse} from '@angular/common/http';

import {CLIENT_ERROR_NOTIFICATIONS} from '../misc/tokens';
import {readErrorsFromHttpErrorResponse} from '../misc/utils';
import {Handle4xxOptions, XXXHttpClientError} from '../interfaces';

/**
 * Handles http error response with code 400..499 with custom return types
 * @param error - Http error response
 * @param options - Options containing information used for obtaining error messages
 * @param errorReturnCallback - Callback that transforms unprocessed http error response into TError
 * @param clientErrorReturnCallback - Callback that transforms processed http error response error messages into TClientError
 */
export function handle4xxFunc<TError, TClientError>(error: HttpErrorResponse,
                                                    options: Handle4xxOptions,
                                                    errorReturnCallback: (error: HttpErrorResponse) => TError,
                                                    clientErrorReturnCallback: (error: XXXHttpClientError) => TClientError): TError|TClientError
{
    //handles 4xx code
    if(error.status >= 400 && error.status < 500)
    {
        const {errors} = readErrorsFromHttpErrorResponse(error, options.injector, options.clientErrorsResponseMapper);
        const notifications = options.injector?.get(CLIENT_ERROR_NOTIFICATIONS, null);

        if(notifications)
        {
            errors.forEach(error => notifications.error(error));
        }

        return clientErrorReturnCallback(
        {
            errors,
            httpResponse: error,
            validationErrors: null,
        });
    }

    return errorReturnCallback(error);
}
