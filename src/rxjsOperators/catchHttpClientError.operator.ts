import {Injector, inject} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {OperatorFunction, catchError, of, throwError} from 'rxjs';

import {HttpClientErrorOptions} from '../interfaces';
import {HttpClientError} from '../misc/classes/httpClientError';
import {handleHttpClientErrors} from '../errorHandlers';

/**
 * Catches http client error response with code 400..499 and returns HttpClientError, otherwise returns original http error response
 * @param options - Options that must be provided in case of running outside of injection context
 */
export function catchHttpClientError(options?: HttpClientErrorOptions): OperatorFunction<unknown, HttpClientError>
{
    const injector: Injector = options?.injector ?? inject(Injector);

    return source =>
    {
        return source.pipe(catchError((err: HttpErrorResponse) =>
        {
            const processedError = handleHttpClientErrors(err, 
            {
                injector, 
                clientErrorsResponseMapper: options?.clientErrorsResponseMapper,
                clientValidationErrorsResponseMapper: options?.clientValidationErrorsResponseMapper,
            });

            if(processedError instanceof HttpClientError)
            {
                return of(processedError);
            }

            return throwError(() => processedError);
        }) as OperatorFunction<unknown, HttpClientError>);
    };
}
