import {Injectable, Optional, Injector, ClassProvider} from "@angular/core";
import {HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from "@angular/common/http";
import {IgnoredInterceptorsService, HttpRequestIgnoredInterceptorId} from "@anglr/common";
import {catchError} from "rxjs/operators";
import {Observable, Observer} from "rxjs";

import {NoConnectionInterceptorOptions} from "./noConnectionInterceptorOptions";

/**
 * NoConnectionInterceptor used for intercepting http responses and handling 0 statuses
 */
@Injectable()
export class NoConnectionInterceptor implements HttpInterceptor
{
    //######################### constructor #########################
    constructor(@Optional() private _options: NoConnectionInterceptorOptions,
                @Optional() private _ignoredInterceptorsService: IgnoredInterceptorsService,
                private _injector: Injector)
    {
        if(!_options || !(_options instanceof NoConnectionInterceptorOptions))
        {
            this._options = new NoConnectionInterceptorOptions();
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
                    (this._ignoredInterceptorsService && this._ignoredInterceptorsService.isIgnored(NoConnectionInterceptor, req)))
                {
                    observer.error(err);
                    observer.complete();

                    return;
                }

                //if no connection to server
                if(err.status == 0)
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
 * Provider for proper use of NoConnectionInterceptor, use this provider to inject this interceptor
 */
export const NO_CONNECTION_INTERCEPTOR_PROVIDER: ClassProvider =
{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: NoConnectionInterceptor
};