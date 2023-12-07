import {HttpErrorResponse} from '@angular/common/http';

import {HttpClientError} from '../misc/classes/httpClientError';
import {readErrorsFromHttpErrorResponse} from '../misc/utils';
import {HttpClientErrorOptions} from '../interfaces';

/**
 * Handles http error response with code 400..499 and returns HttpClientError, otherwise returns original http error response
 * @param error - Instance of `HttpErrorResponse`
 * @param options - Options used for handling http client errors
 */
export async function handleHttpClientErrorResponse(error: HttpErrorResponse, options: HttpClientErrorOptions): Promise<HttpClientError|HttpErrorResponse>
{
    //handles client codes (400..499)
    if(error.status >= 400 && error.status < 500)
    {
        const ignoredCodes = options.ignoredHttpStatusCodes ?? [];

        //ignored code, not handled
        if(ignoredCodes.indexOf(error.status) >= 0)
        {
            return error;
        }

        const {errors, validationErrors} = await readErrorsFromHttpErrorResponse(error, options.injector, options.clientErrorsResponseMapper, options.clientValidationErrorsResponseMapper);

        return new HttpClientError(errors, validationErrors, error);
    }

    return error;
}
