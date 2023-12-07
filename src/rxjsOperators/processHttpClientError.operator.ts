import {Injector, inject} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MonoTypeOperatorFunction, Observable, catchError, throwError} from 'rxjs';

import {HttpClientErrorOptions} from '../interfaces';
import {handleHttpClientErrors} from '../errorHandlers';

/**
 * Processes http client error response with code 400..499 and converts it into HttpClientError, otherwise throw original http error response
 * @param options - Options that must be provided in case of running outside of injection context
 */
export function processHttpClientError<TType>(options?: HttpClientErrorOptions): MonoTypeOperatorFunction<TType>
{
    const injector: Injector = options?.injector ?? inject(Injector);

    return source =>
    {
        return source.pipe(catchError(err =>
        {
            //nothing to process
            if (!(err instanceof HttpErrorResponse))
            {
                return throwError(() => err);
            }

            //client error, not response from server
            if (err.error instanceof Error)
            {
                return throwError(() => err);
            }

            return new Observable<never>(observer =>
            {
                (async () =>
                {
                    const processedError = await handleHttpClientErrors(err, 
                    {
                        injector, 
                        clientErrorsResponseMapper: options?.clientErrorsResponseMapper,
                        clientValidationErrorsResponseMapper: options?.clientValidationErrorsResponseMapper,
                    });

                    observer.error(processedError);
                    observer.complete();
                })();
            });
        }));
    };
}
