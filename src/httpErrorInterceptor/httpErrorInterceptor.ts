import {Injectable, Inject, Optional, ClassProvider, ValueProvider, OpaqueToken} from '@angular/core';
import {Response} from '@angular/http';
import {HttpInterceptor, HTTP_INTERCEPTORS} from '@ng2/http-extensions';
import {HttpErrorInterceptorOptions} from './httpErrorInterceptorOptions';
import {InternalServerErrorService} from '../internalServerError/internalServerError.service';
import {GlobalNotificationsService} from '@ng2/notifications';
import {ServerValidationService} from '../serverValidation//serverValidation.service';
import {StringMapWrapper} from '@angular/core/src/facade/collection';
import {isFunction} from '@angular/core/src/facade/lang';
import {BadRequestDetail} from './badRequestDetail';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

/**
 * Token for map function provider
 */
const ERROR_RESPONSE_MAP_PROVIDER: OpaqueToken = new OpaqueToken("ErrorResponseMapProvider");

/**
 * Creates response mapping function for http error interceptor
 * @param  {(err:any)=>BadRequestDetail} mappingFuncion Function that maps response to BadRequestDetail
 * @returns Provider
 */
export function provideResponseMapper(mappingFuncion: (err: any) => BadRequestDetail): ValueProvider
{
    return {
        provide: ERROR_RESPONSE_MAP_PROVIDER,
        useValue: mappingFuncion
    };
}

/**
 * Interceptor that is used for handling http errors with codes 400, 404..599
 */
@Injectable()
export class HttpErrorInterceptor extends HttpInterceptor
{
    //######################### constructor #########################
    constructor(@Optional() private _options: HttpErrorInterceptorOptions,
                @Optional() private _internalServerErrorService: InternalServerErrorService,
                @Optional() private _serverValidationService: ServerValidationService,
                @Optional() @Inject(ERROR_RESPONSE_MAP_PROVIDER) private _responseMapper: (err: any) => BadRequestDetail,
                private _notifications: GlobalNotificationsService)
    {
        super();
        
        if(!_options)
        {
            this._options = new HttpErrorInterceptorOptions();
        }
        
        if(!_responseMapper || !isFunction(_responseMapper))
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
                            StringMapWrapper.forEach(errorDetail.validationErrors, (errors: string[]) =>
                            {
                                errors.forEach(errorMessage => this._notifications.error(errorMessage));
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