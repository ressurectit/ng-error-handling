import {Injectable, Inject, Optional, ClassProvider} from '@angular/core';
import {HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpErrorResponse, HttpRequest} from '@angular/common/http';
import {Logger, LOGGER, IGNORED_INTERCEPTORS} from '@anglr/common';
import {Observable, tap} from 'rxjs';

import {InternalServerErrorService} from '../internalServerError/internalServerError.service';

/**
 * Interceptor that is used for handling http server errors with codes 500..599 and displaying of internal server error
 */
@Injectable()
export class HttpServerErrorInterceptor implements HttpInterceptor
{
    //######################### constructor #########################
    constructor(@Optional() private _internalServerErrorService: InternalServerErrorService,
                @Inject(LOGGER) private _logger: Logger)
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
                        req.context.get(IGNORED_INTERCEPTORS).some(itm => itm == HttpServerErrorInterceptor))
                    {
                        return;
                    }

                    //if server error
                    if(err.status >= 500 && err.status < 600)
                    {
                        this._logger.error('HTTP_ERROR 5xx: url: {{err.url}} error: {{@err.error}}', {url: err.url, error: err.error});

                        if(this._internalServerErrorService)
                        {
                            this._internalServerErrorService.showInternalServerError(err.error, err.url ?? '');
                        }
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
 * Provider for proper use of HttpServerErrorInterceptor, use this provider to inject this interceptor
 */
export const HTTP_SERVER_ERROR_INTERCEPTOR_PROVIDER: ClassProvider = 
{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: HttpServerErrorInterceptor
};