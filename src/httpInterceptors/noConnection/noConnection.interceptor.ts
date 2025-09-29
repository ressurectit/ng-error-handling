import {Injectable, Injector, ClassProvider, inject, runInInjectionContext} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpRequest, HttpHandlerFn} from '@angular/common/http';
import {IGNORED_INTERCEPTORS} from '@anglr/common';
import {Observable, Observer, catchError} from 'rxjs';

import {NoConnectionInterceptorOptions} from './noConnectionInterceptor.options';

/**
 * NoConnectionInterceptor used for intercepting http responses and handling 0 statuses
 * @deprecated Use new `noConnectionInterceptor` function instead
 */
@Injectable()
export class NoConnectionInterceptor implements HttpInterceptor
{
    //######################### constructors #########################
    constructor(private _injector: Injector)
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
        return runInInjectionContext(this._injector, () => noConnectionInterceptor(req, next.handle.bind(next)));
    }
}

/**
 * Provider for proper use of NoConnectionInterceptor, use this provider to inject this interceptor
 * @deprecated Use new `noConnectionInterceptor` function instead
 */
export const NO_CONNECTION_INTERCEPTOR_PROVIDER: ClassProvider =
{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: NoConnectionInterceptor,
};

/**
 * Interceptor used for intercepting http responses and handling 0 statuses
 */
export function noConnectionInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>
{
    const injector = inject(Injector);
    let options = inject(NoConnectionInterceptorOptions, {optional: true});

    if(!(options instanceof NoConnectionInterceptorOptions))
    {
        options = new NoConnectionInterceptorOptions();
    }

    return next(req).pipe(catchError(err =>
    {
        return new Observable((observer: Observer<unknown>) =>
        {
            //client error, not response from server, or is ignored
            if(err.error instanceof Error ||
               req.context.get(IGNORED_INTERCEPTORS).some(itm => itm == NoConnectionInterceptor || itm == noConnectionInterceptor))
            {
                observer.error(err);
                observer.complete();

                return;
            }

            //if no connection to server
            if(err.status == 0)
            {
                options.action(injector, observer);

                return;
            }

            //other errors
            observer.error(err);
            observer.complete();
        }) as Observable<HttpEvent<unknown>>;
    }));
}
