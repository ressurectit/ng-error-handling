import {Injectable, Optional, Injector, ClassProvider} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {IGNORED_INTERCEPTORS} from '@anglr/common';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {ServiceUnavailableInterceptorOptions} from './serviceUnavailableInterceptorOptions';

/**
 * ServiceUnavailableInterceptor used for intercepting http responses and handling 503 statuses
 */
@Injectable()
export class ServiceUnavailableInterceptor implements HttpInterceptor
{
    //######################### constructor #########################
    constructor(@Optional() private _options: ServiceUnavailableInterceptorOptions,
                private _injector: Injector)
    {
        if(!_options || !(_options instanceof ServiceUnavailableInterceptorOptions))
        {
            this._options = new ServiceUnavailableInterceptorOptions();
        }
    }

    //######################### public methods - implementation of HttpInterceptor #########################

    /**
     * Intercepts http request
     * @param req - Request to be intercepted
     * @param next - Next middleware that can be called for next processing
     */
    public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
    {
        return next.handle(req).pipe(catchError((err) =>
        {
            return new Observable(observer =>
            {
                //client error, not response from server, or is ignored
                if (err.error instanceof Error ||
                    req.context.get(IGNORED_INTERCEPTORS).some(itm => itm == ServiceUnavailableInterceptor))
                {
                    observer.error(err);
                    observer.complete();

                    return;
                }

                //if service unavailable
                if(err.status == 503)
                {
                    this._options.action(this._injector, observer);

                    return;
                }

                //other errors
                observer.error(err);
                observer.complete();
            }) as Observable<HttpEvent<unknown>>;
        }));
    }
}

/**
 * Provider for proper use of ServiceUnavailableInterceptor, use this provider to inject this interceptor
 */
export const SERVICE_UNAVAILABLE_INTERCEPTOR_PROVIDER: ClassProvider =
{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: ServiceUnavailableInterceptor
};