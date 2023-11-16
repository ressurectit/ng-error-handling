import {HttpErrorResponse} from '@angular/common/http';
import {isEmptyObject} from '@jscrpt/common';

import {CLIENT_ERROR_NOTIFICATIONS} from '../misc/tokens';
import {readErrorsFromHttpErrorResponse} from '../misc/utils';
import {Handle4xxOptions, HttpClientError} from '../interfaces';
import {ServerValidationService} from '../services';

/**
 * Handles http error response with code 400 and process validations errors, with custom return types
 * @param error - Http error response
 * @param options - Options containing information used for obtaining error messages
 * @param errorReturnCallback - Callback that transforms unprocessed http error response into TError
 * @param clientErrorReturnCallback - Callback that transforms processed http error response error messages into TClientError
 * @param clientValidationErrorReturnCallback - Callback that transforms processed http error response validation error messages into TClientValidationError
 */
export function handle400WithValidationsFunc<TError, TClientError, TClientValidationError>(error: HttpErrorResponse,
                                                                                           options: Handle4xxOptions,
                                                                                           errorReturnCallback: (error: HttpErrorResponse) => TError,
                                                                                           clientErrorReturnCallback: (error: HttpClientError) => TClientError,
                                                                                           clientValidationErrorReturnCallback?: (error: HttpClientError) => TClientValidationError): TError|TClientError|TClientValidationError
{
    //handles 400 code
    if(error.status == 400)
    {
        const {errors, validationErrors} = readErrorsFromHttpErrorResponse(error, options.injector, options.clientErrorsResponseMapper, options.clientValidationErrorsResponseMapper);
        const notifications = options.injector?.get(CLIENT_ERROR_NOTIFICATIONS, null);

        if(notifications)
        {
            errors.forEach(error => notifications.error(error));
        }

        if(validationErrors && !isEmptyObject(validationErrors) && clientValidationErrorReturnCallback)
        {
            options.injector?.get(ServerValidationService).addServerValidationErrors(validationErrors);

            return clientValidationErrorReturnCallback(
            {
                errors,
                validationErrors,
                httpResponse: error,
            });
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