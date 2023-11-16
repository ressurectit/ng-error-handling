import {Injectable, Optional, Injector, ClassProvider} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {IGNORED_INTERCEPTORS} from '@anglr/common';
import {Observable, Observer, catchError} from 'rxjs';

import {NoConnectionInterceptorOptions} from './noConnectionInterceptorOptions';

/**
 * NoConnectionInterceptor used for intercepting http responses and handling 0 statuses
 */
@Injectable()
export class NoConnectionInterceptor implements HttpInterceptor
{
    //######################### constructor #########################
    constructor(@Optional() private _options: NoConnectionInterceptorOptions,
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
     * @param req - Request to be intercepted
     * @param next - Next middleware that can be called for next processing
     */
    public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
    {
        return next.handle(req).pipe(catchError((err) =>
        {
            return new Observable((observer: Observer<unknown>) =>
            {
                //client error, not response from server, or is ignored
                if (err.error instanceof Error ||
                    req.context.get(IGNORED_INTERCEPTORS).some(itm => itm == NoConnectionInterceptor))
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
            }) as Observable<HttpEvent<unknown>>;
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