import {Injector, inject} from '@angular/core';
import {extend} from '@jscrpt/common/extend';
import {Observable, OperatorFunction, catchError, throwError} from 'rxjs';

import {CatchHttpClientErrorOptions} from '../interfaces';
import {handleHttpClientErrors} from '../errorHandlers';
import {HttpClientError} from '../misc/classes/httpClientError';
import {HttpClientErrorHandlers, HttpClientErrorMessages} from '../misc/types';
import {HTTP_CLIENT_ERROR_HANDLERS, HTTP_CLIENT_ERROR_MESSAGES} from '../misc/tokens';

/**
 * Catches http client errors and handles them according provided options
 * @param options - Options that must be provided in case of running outside of injection context
 */
export function catchHttpClientError<TIn>(options?: CatchHttpClientErrorOptions): OperatorFunction<TIn, TIn|HttpClientError>
{
    const injector: Injector = options?.injector ?? inject(Injector);
    const messages: HttpClientErrorMessages = extend({}, injector.get(HTTP_CLIENT_ERROR_MESSAGES, {}, {optional: true}), options?.messages);
    const handlers: HttpClientErrorHandlers = extend({}, injector.get(HTTP_CLIENT_ERROR_HANDLERS, {}, {optional: true}), options?.handlers);

    return source =>
    {
        return source.pipe(catchError(err =>
        {
            //nothing to process
            if(!(err instanceof HttpClientError))
            {
                return throwError(() => err);
            }

            return new Observable<HttpClientError|never>(observer =>
            {
                (async () =>
                {
                    try
                    {
                        const result = await handleHttpClientErrors(err,
                        {
                            ...options,
                            injector,
                            messages,
                            handlers,
                        });

                        if(!result)
                        {
                            return;
                        }

                        observer.next(result);
                        observer.complete();
                    }
                    catch(e)
                    {
                        observer.error(e);
                        observer.complete();
                    }
                })();
            });
        }));
    };
}
