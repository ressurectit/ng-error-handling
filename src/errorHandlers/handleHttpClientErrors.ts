import {HttpErrorResponse} from '@angular/common/http';

import {HttpClientError} from '../misc/classes/httpClientError';
import {readErrorsFromHttpErrorResponse} from '../misc/utils';
import {HttpClientErrorOptions} from '../interfaces';

/**
 * Handles http error response with code 400..499 and returns HttpClientError, otherwise returns original http error response
 */
export function handleHttpClientErrors(error: HttpErrorResponse, options: HttpClientErrorOptions): HttpClientError|HttpErrorResponse
{
    //handles client codes (400..499)
    if(error.status >= 400 && error.status < 500)
    {
        const {errors, validationErrors} = readErrorsFromHttpErrorResponse(error, options.injector, options.clientErrorsResponseMapper, options.clientValidationErrorsResponseMapper);

        return new HttpClientError(errors, validationErrors, error);
    }

    return error;
}
