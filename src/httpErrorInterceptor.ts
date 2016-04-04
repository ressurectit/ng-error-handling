import {Injectable, Inject, Optional, provide, Provider, OpaqueToken} from 'angular2/core';
import {Response} from 'angular2/http';
import {HttpInterceptor, HTTP_INTERCEPTORS} from 'ng2-http-extensions/interceptableHttp';
import {HttpErrorInterceptorOptions} from './httpErrorInterceptorOptions';
import {Observable} from 'rxjs/Observable';
import {InternalServerErrorService} from './internalServerError.service';
import {GlobalNotificationsService} from 'ng2-notifications/common';
import {ServerValidationService} from './serverValidation.service';
import {StringMapWrapper} from 'angular2/src/facade/collection';
import {isFunction} from 'angular2/src/facade/lang';
import {BadRequestDetail} from './badRequestDetail';

const ERROR_RESPONSE_MAP_PROVIDER: OpaqueToken = new OpaqueToken("ErrorResponseMapProvider");

/**
 * Creates response mapping function for http error interceptor
 * @param  {(err:any)=>BadRequestDetail} mappingFuncion Function that maps response to BadRequestDetail
 * @returns Provider
 */
export function createResponseMapperProvider(mappingFuncion: (err: any) => BadRequestDetail): Provider
{
    return provide(ERROR_HANDLING_INTERCEPTOR_PROVIDER,
    {
        useValue: mappingFuncion
    });
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
        return response.catch((err: Response) =>
        {
            if(err.status == 400 || err.status >= 404)
            {
                if(this._options.debug && err.status >= 500 && err.status <= 599)
                {
                    if(this._internalServerErrorService)
                    {
                        this._internalServerErrorService.showInternalServerError(err.text(), err.url);
                    }
                    
                    return Observable.throw(err);
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
            
            return Observable.throw(err);
        });
    }
}

/**
 * Provider for proper use of HttpErrorInterceptor, use this provider to inject this interceptor
 */
export const ERROR_HANDLING_INTERCEPTOR_PROVIDER = provide(HTTP_INTERCEPTORS,
{
    multi: true,
    useClass: HttpErrorInterceptor
});