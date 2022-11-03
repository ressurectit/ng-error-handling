import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import {Handle4xxOptions} from '../misc/httpError.interface';
import {CLIENT_ERROR_NOTIFICATIONS} from '../misc/tokens';
import {RestClientError, ClientValidationError} from '../misc/httpErrors';
import {readErrorsFromHttpErrorResponse} from '../misc/utils';
import {getDefaultClientErrorObservable} from '../misc/clientErrorHandling.options';

/**
 * Handles http error response with code 400..499 and returns RestClientError
 * @param error - Http error response to be handled
 * @param options - Options containing required stuff for handling errors
 */
export function handle4xxFunc(error: HttpErrorResponse, options: Handle4xxOptions): Observable<RestClientError|ClientValidationError>
{
    return ɵhandle4xxFunction(error,
                              options,
                              error => throwError(() => error),
                              errors => getDefaultClientErrorObservable({errors, httpResponse: error, validationErrors: null}, err => new RestClientError(err.errors), options.options?.behavior));
}

/**
 * Handles http error response with code 400..499 with custom return types
 */
export function ɵhandle4xxFunction<TError, TClientError>(error: HttpErrorResponse,
                                                         options: Handle4xxOptions,
                                                         errorReturnCallback: (error: HttpErrorResponse) => TError,
                                                         clientErrorReturnCallback: (errors: string[]) => TClientError): TError|TClientError
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

        return clientErrorReturnCallback(errors);
    }

    return errorReturnCallback(error);
}
