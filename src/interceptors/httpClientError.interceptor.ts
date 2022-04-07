import {Injectable, Inject, Optional, ClassProvider} from '@angular/core';
import {HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpErrorResponse, HttpRequest} from '@angular/common/http';
import {Logger, LOGGER, IGNORED_INTERCEPTORS} from '@anglr/common';
import {InternalServerErrorService} from '@anglr/error-handling';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {HTTP_IGNORED_CLIENT_ERRORS} from '../misc/tokens';

/**
 * Interceptor that is used for handling http server errors with codes 400..499
 */
@Injectable()
export class HttpClientErrorInterceptor implements HttpInterceptor
{
    //######################### constructor #########################
    constructor(@Optional() protected _internalServerErrorService: InternalServerErrorService,
                @Inject(HTTP_IGNORED_CLIENT_ERRORS) protected _ignoredClientErrors: number[],
                @Inject(LOGGER) protected _logger: Logger,)
    {
    }

    //######################### public methods - implementation of HttpInterceptor #########################

    /**
     * Intercepts http request
     * @param req - Request to be intercepted
     * @param next - Next middleware that can be called for next processing
     */
    public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
    {
        if(jsDevMode)
        {
            return next.handle(req)
                .pipe(tap(() => {}, err =>
                {
                    //nothing to handle
                    if (!(err instanceof HttpErrorResponse))
                    {
                        return;
                    }

                    //client error, not response from server, or is ignored
                    if (err.error instanceof Error || 
                        req.context.get(IGNORED_INTERCEPTORS).some(itm => itm == HttpClientErrorInterceptor))
                    {
                        return;
                    }

                    //if client error
                    if(err.status >= 400 && err.status < 500 && !this._ignoredClientErrors.find(itm => itm == err.status))
                    {
                        this._logger.error(`HTTP_ERROR ${err.status} ${err.statusText}: ${err.error}`);

                        //TODO: finish
                    }
                }));
        }
        else
        {
            return next.handle(req);
        }
    }
}

/**
 * Provider for proper use of HttpClientErrorInterceptor, use this provider to inject this interceptor
 */
export const HTTP_CLIENT_ERROR_INTERCEPTOR_PROVIDER: ClassProvider = 
{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: HttpClientErrorInterceptor
};