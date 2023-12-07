import {HttpErrorResponse} from '@angular/common/http';

import {readErrorsFromHttpErrorResponse} from '../misc/utils';
import {Handle4xxOptions, XXXHttpClientError} from '../interfaces';

/**
 * Handles http error response with code 404 with custom return types
 * @param error - Http error response
 * @param options - Options containing information used for obtaining error messages
 * @param errorReturnCallback - Callback that transforms unprocessed http error response into TError
 * @param clientErrorReturnCallback - Callback that transforms processed http error response error messages into TClientError
 */
export async function handle404Func<TError, TClientError>(error: HttpErrorResponse,
                                                          options: Handle4xxOptions,
                                                          errorReturnCallback: (error: HttpErrorResponse) => TError,
                                                          clientErrorReturnCallback: (error: XXXHttpClientError) => TClientError): Promise<TError|TClientError>
{
    if(error.status == 404)
    {
        const {errors} = await readErrorsFromHttpErrorResponse(error, options.injector, options.clientErrorsResponseMapper);

        return clientErrorReturnCallback(
        {
            errors,
            httpResponse: error,
            validationErrors: null,
        });
    }

    return errorReturnCallback(error);
}
