import {Injectable, Inject, Optional, ClassProvider, ValueProvider, InjectionToken} from '@angular/core';
import {Response} from '@angular/http';
import {HttpInterceptor, HTTP_INTERCEPTORS} from '@anglr/http-extensions';
import {HttpErrorInterceptorOptions} from './httpErrorInterceptorOptions';
import {InternalServerErrorService} from '../internalServerError/internalServerError.service';
import {GlobalNotificationsService} from '@anglr/notifications';
import {ServerValidationService} from '../serverValidation//serverValidation.service';
import {isFunction, isArray} from '@anglr/common';
import {BadRequestDetail} from './badRequestDetail';
import {Observable} from 'rxjs/Observable';

/**
 * Type of mapper function
 */
export type ResponseMapperFunction = (err: any) => BadRequestDetail;

/**
 * Token for map function provider
 */
export const ERROR_RESPONSE_MAP_PROVIDER: InjectionToken<ResponseMapperFunction> = new InjectionToken<ResponseMapperFunction>("ErrorResponseMapProvider");

/**
 * Interceptor that is used for handling http errors with default codes 400, 405..599
 */
@Injectable()
export class HttpErrorInterceptor extends HttpInterceptor
{
    //######################### private fields #########################

    /**
     * Response mapper function
     */
    private _responseMapper: ResponseMapperFunction;

    //######################### constructor #########################
    constructor(@Optional() private _options: HttpErrorInterceptorOptions,
                @Optional() private _internalServerErrorService: InternalServerErrorService,
                @Optional() private _serverValidationService: ServerValidationService,
                @Optional() @Inject(ERROR_RESPONSE_MAP_PROVIDER) responseMapper: any,
                private _notifications: GlobalNotificationsService)
    {
        super();

        this._responseMapper = responseMapper;
        
        if(!_options)
        {
            this._options = new HttpErrorInterceptorOptions();
        }
        
        if(!this._responseMapper || !isFunction(this._responseMapper))
        {
            this._responseMapper = itm => itm;
        }
    }

    //######################### public methods - overriden HttpInterceptor #########################
    interceptResponse(response: Observable<any>): Observable<any>
    {
        return response.do(() => {}, (err: Response) =>
        {
            if(this._options.shouldHandlePredicate(err))
            {
                if(this._options.debug && err.status >= 500 && err.status <= 599)
                {
                    if(this._internalServerErrorService)
                    {
                        this._internalServerErrorService.showInternalServerError(err.text(), err.url);
                    }
                    
                    return;
                }
                
                try
                {
                    var errorDetail = this._responseMapper(err.json());
                    
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
        });
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