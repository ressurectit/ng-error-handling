import {Injectable, Optional, Injector, ClassProvider} from "@angular/core";
import {HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from "@angular/common/http";
import {IgnoredInterceptorsService, HttpRequestIgnoredInterceptorId} from "@anglr/common";
import {Observable, Observer} from "rxjs";
import {catchError} from "rxjs/operators";

import {HttpGatewayTimeoutInterceptorOptions} from "./httpGatewayTimeoutInterceptorOptions";

/**
 * HttpGatewayTimeoutInterceptor used for intercepting http responses and handling 504 statuses
 */
@Injectable()
export class HttpGatewayTimeoutInterceptor implements HttpInterceptor
{
    //######################### constructor #########################
    constructor(@Optional() private _options: HttpGatewayTimeoutInterceptorOptions,
                @Optional() private _ignoredInterceptorsService: IgnoredInterceptorsService,
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
     * @param {HttpRequestIgnoredInterceptorId<any>} req Request to be intercepted
     * @param {HttpHandler} next Next middleware that can be called for next processing
     */
    public intercept(req: HttpRequestIgnoredInterceptorId<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(req).pipe(catchError((err) =>
        {
            return Observable.create((observer: Observer<any>) =>
            {
                //client error, not response from server, or is ignored
                if (err.error instanceof Error ||
                    (this._ignoredInterceptorsService && this._ignoredInterceptorsService.isIgnored(HttpGatewayTimeoutInterceptor, req)))
                {
                    observer.error(err);
                    observer.complete();

                    return;
                }

                //if gateway timeout
                if(err.status == 504)
                {
                    this._options.action(this._injector, observer);

                    return;
                }

                //other errors
                observer.error(err);
                observer.complete();
            }) as Observable<HttpEvent<any>>;
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
    useClass: HttpGatewayTimeoutInterceptor
};