import {Injectable, Inject, Optional, ClassProvider, InjectionToken} from '@angular/core';
import {HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {GlobalNotificationsService} from '@anglr/notifications';
import {isFunction, isArray} from '@jscrpt/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {HttpErrorInterceptorOptions} from './httpErrorInterceptorOptions';
import {InternalServerErrorService} from '../internalServerError/internalServerError.service';
import {ServerValidationService} from '../serverValidation//serverValidation.service';
import {BadRequestDetail} from './badRequestDetail';

/**
 * Type of mapper function
 */
export type ResponseMapperFunction = (err: HttpErrorResponse) => BadRequestDetail;

/**
 * Token for map function provider
 */
export const ERROR_RESPONSE_MAP_PROVIDER: InjectionToken<ResponseMapperFunction> = new InjectionToken<ResponseMapperFunction>("ErrorResponseMapProvider");

/**
 * Interceptor that is used for handling http errors with default codes 400, 405..599
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor
{
    //######################### constructor #########################
    constructor(@Optional() private _options: HttpErrorInterceptorOptions,
                @Optional() private _internalServerErrorService: InternalServerErrorService,
                @Optional() private _serverValidationService: ServerValidationService,
                @Optional() @Inject(ERROR_RESPONSE_MAP_PROVIDER) private _responseMapper: ResponseMapperFunction,
                private _notifications: GlobalNotificationsService)
    {
        if(!_options)
        {
            this._options = new HttpErrorInterceptorOptions();
        }
        
        if(!this._responseMapper || !isFunction(this._responseMapper))
        {
            this._responseMapper = itm => JSON.parse(itm.error);
        }
    }

    //######################### public methods - implementation of HttpInterceptor #########################

    /**
     * Intercepts http request
     * @param req - Request to be intercepted
     * @param next - Next middleware that can be called for next processing
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(req)
            .pipe(tap(() => {}, (err: HttpErrorResponse) =>
            {
                //client error, not response from server
                if (err.error instanceof Error)
                {
                    return;
                }

                //tests error code and allows selection of codes to be processed
                if(this._options.shouldHandlePredicate(err))
                {
                    if(this._options.debug && err.status >= 500 && err.status <= 599)
                    {
                        if(this._internalServerErrorService)
                        {
                            this._internalServerErrorService.showInternalServerError(err.error, err.url);
                        }
                        
                        return;
                    }
                    
                    try
                    {
                        var errorDetail = this._responseMapper(err);
                        
                        if(errorDetail.errors)
                        {
                            errorDetail.errors.forEach(itm =>
                            {
                                this._notifications.error(itm);
                            })
                        }
                        
                        if(errorDetail.validationErrors)
                        {
                            if(this._serverValidationService && !this._options.globalValidationMessages)
                            {
                                this._serverValidationService.addServerValidationErrors(errorDetail.validationErrors);
                            }
                            else
                            {
                                Object.keys(errorDetail.validationErrors).forEach((errorInputName: string) =>
                                {
                                    if(isArray(errorDetail.validationErrors[errorInputName]))
                                    {
                                        errorDetail.validationErrors[errorInputName].forEach(errorMessage => this._notifications.error(errorMessage));
                                    }
                                });
                            }
                        }
                    }
                    catch(error)
                    {
                        this._notifications.error(`Request '${err.url}' ended with error code: ${err.status}`);
                    }
                }
            }));
    }
}

/**
 * Provider for proper use of HttpErrorInterceptor, use this provider to inject this interceptor
 */
export const HTTP_ERROR_INTERCEPTOR_PROVIDER: ClassProvider = 
{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: HttpErrorInterceptor
};