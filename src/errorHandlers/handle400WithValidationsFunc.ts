import {HttpErrorResponse} from '@angular/common/http';
import {isEmptyObject} from '@jscrpt/common';
import {Observable, of, throwError} from 'rxjs';

import {Handle400WithValidationsOptions, HttpClientValidationErrors} from '../misc/httpError.interface';
import {CLIENT_ERROR_NOTIFICATIONS} from '../misc/tokens';
import {RestClientError, ClientValidationError} from '../misc/httpErrors';
import {ServerValidationService} from '../serverValidation/serverValidation.service';
import {readErrorsFromHttpErrorResponse} from '../misc/utils';

/**
 * Handles http error response with code 400 and process validations errors and returns RestClientError or RestClientValidationError
 * @param error - Http error response to be handled
 * @param options - Options containing required stuff for handling errors
 */
export function handle400WithValidationsFunc(error: HttpErrorResponse, options: Handle400WithValidationsOptions): Observable<RestClientError|ClientValidationError>
{
    return ɵHandle400WithValidationsFunction(error,
                                             options,
                                             error => throwError(() => error),
                                             errors => of(new RestClientError(errors)),
                                             (errors, validationErrors) => of(new ClientValidationError(errors, validationErrors)));
}

/**
 * Handles http error response with code 400 and process validations errors, with custom return types
 */
export function ɵHandle400WithValidationsFunction<TError, TClientError, TClientValidationError>(error: HttpErrorResponse,
                                                                                                options: Handle400WithValidationsOptions,
                                                                                                errorReturnCallback: (error: HttpErrorResponse) => TError,
                                                                                                clientErrorReturnCallback: (errors: string[]) => TClientError,
                                                                                                clientValidationErrorReturnCallback: (errors: string[], validationErrors: HttpClientValidationErrors | null) => TClientValidationError): TError|TClientError|TClientValidationError
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

        if(validationErrors && !isEmptyObject(validationErrors))
        {
            options.injector?.get(ServerValidationService).addServerValidationErrors(validationErrors);

            return clientValidationErrorReturnCallback(errors, validationErrors);
        }

        return clientErrorReturnCallback(errors);
    }

    return errorReturnCallback(error);
}
