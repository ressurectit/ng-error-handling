import {Injectable, Optional, Injector, ClassProvider} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {IGNORED_INTERCEPTORS} from '@anglr/common';
import {Observable, Observer, catchError} from 'rxjs';

import {HttpGatewayTimeoutInterceptorOptions} from './httpGatewayTimeoutInterceptor.options';

/**
 * HttpGatewayTimeoutInterceptor used for intercepting http responses and handling 504 statuses
 */
@Injectable()
export class HttpGatewayTimeoutInterceptor implements HttpInterceptor
{
    //######################### constructor #########################
    constructor(@Optional() private _options: HttpGatewayTimeoutInterceptorOptions,
                private _injector: Injector)
    {
        if(!_options || !(_options instanceof HttpGatewayTimeoutInterceptorOptions))
        {
            this._options = new HttpGatewayTimeoutInterceptorOptions();
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
                    req.context.get(IGNORED_INTERCEPTORS).some(itm => itm == HttpGatewayTimeoutInterceptor))
                {
                    observer.error(err);
                    observer.complete();

                    return;
                }

                //if gateway timeout
                if(err.status == 504)
                {
                    this._options.action(this._injector, observer as Observer<unknown>);

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
 * Provider for proper use of HttpGatewayTimeoutInterceptor, use this provider to inject this interceptor
 */
export const HTTP_GATEWAY_TIMEOUT_INTERCEPTOR_PROVIDER: ClassProvider =
{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: HttpGatewayTimeoutInterceptor,
};
