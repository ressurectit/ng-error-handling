import {HttpErrorResponse} from '@angular/common/http';

import {Handle4xxOptions, HttpClientError} from '../misc/httpError.interface';
import {readErrorsFromHttpErrorResponse} from '../misc/utils';

/**
 * Handles http error response with code 404 with custom return types
 * @param error - Http error response
 * @param options - Options containing information used for obtaining error messages
 * @param errorReturnCallback - Callback that transforms unprocessed http error response into TError
 * @param clientErrorReturnCallback - Callback that transforms processed http error response error messages into TClientError
 */
export function handle404Func<TError, TClientError>(error: HttpErrorResponse,
                                                    options: Handle4xxOptions,
                                                    errorReturnCallback: (error: HttpErrorResponse) => TError,
                                                    clientErrorReturnCallback: (error: HttpClientError) => TClientError): TError|TClientError
{
    if(error.status == 404)
    {
        const {errors} = readErrorsFromHttpErrorResponse(error, options.injector, options.clientErrorsResponseMapper);

        return clientErrorReturnCallback(
        {
            errors,
            httpResponse: error,
            validationErrors: null,
        });
    }

    return errorReturnCallback(error);
}
