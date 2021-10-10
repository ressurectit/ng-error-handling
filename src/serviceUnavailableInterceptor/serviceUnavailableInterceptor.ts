import {Injectable, Optional, Injector, ClassProvider} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {IgnoredInterceptorsService, IgnoredInterceptorId, AdditionalInfo} from '@anglr/common';
import {Observable, Observer} from 'rxjs';
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
                @Optional() private _ignoredInterceptorsService: IgnoredInterceptorsService,
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
    public intercept(req: HttpRequest<any> & AdditionalInfo<IgnoredInterceptorId>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(req).pipe(catchError((err) =>
        {
            return Observable.create((observer: Observer<any>) =>
            {
                //client error, not response from server, or is ignored
                if (err.error instanceof Error ||
                    (this._ignoredInterceptorsService && this._ignoredInterceptorsService.isIgnored(ServiceUnavailableInterceptor, req.additionalInfo)))
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
            }) as Observable<HttpEvent<any>>;
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