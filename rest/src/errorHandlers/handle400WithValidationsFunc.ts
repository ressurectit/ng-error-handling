import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import {Handle400WithValidationsOptions} from '../rest.interface';
import {CLIENT_ERROR_NOTIFICATIONS, REST_CLIENT_ERRORS_RESPONSE_MAPPER, REST_CLIENT_VALIDATION_ERRORS_RESPONSE_MAPPER} from '../tokens';
import {RestClientError, ClientValidationError} from '../types';

/**
 * Handles http error response with code 400 and process validations errors and returns RestClientError or RestClientValidationError
 * @param error - Http error response to be handled
 * @param options - Options containing required stuff for handling errors
 */
export function handle400WithValidationsFunc(error: HttpErrorResponse, options: Handle400WithValidationsOptions): Observable<RestClientError|ClientValidationError>
{
    //handles 400 code
    if(error.status == 400)
    {
        const clientErrorsResponseMapper = options.clientErrorsResponseMapper ?? options.injector.get(REST_CLIENT_ERRORS_RESPONSE_MAPPER);
        const clientValidationErrorsResponseMapper = options.clientValidationErrorsResponseMapper ?? options.injector.get(REST_CLIENT_VALIDATION_ERRORS_RESPONSE_MAPPER);
        const errors = clientErrorsResponseMapper(error);
        const validationErrors = clientValidationErrorsResponseMapper(error);
        const notifications = options.injector.get(CLIENT_ERROR_NOTIFICATIONS, null);

        errors?.forEach(error => notifications?.error(error));

        if(validationErrors)
        {
            //TODO

            return of(new ClientValidationError(errors, validationErrors));
        }

        return of(new RestClientError(errors));
    }

    return throwError(error);
}
