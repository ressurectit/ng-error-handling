import {Injectable, Optional, provide, Provider} from 'angular2/core';
import {Response} from 'angular2/http';
import {HttpInterceptor, HTTP_INTERCEPTORS} from 'ng2-http-extensions/interceptableHttp';
import {HttpErrorInterceptorOptions} from './httpErrorInterceptorOptions';
import {Observable} from 'rxjs/Observable';
import {InternalServerErrorService} from './internalServerError.service';
import {GlobalNotificationsService} from 'ng2-notifications/common';
import {ServerValidationService} from './serverValidation.service';

/**
 * Information about error, formatted for REST api
 */
interface BadRequestDetail
{
    /**
     * Gets or sets error messages that will be displayed
     */
    errors: string[];

    /**
     * Gets or sets validation error messages to be displayed
     */
    validationErrors: {[key: string]: string[]}; 
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
                private _notifications: GlobalNotificationsService)
    {
        super();
        
        if(!_options)
        {
            this._options = new HttpErrorInterceptorOptions(false);
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
                    
                    return Observable.empty();
                }
                
                var errorDetail = <BadRequestDetail>err.json();
                
                if(errorDetail.errors)
                {
                    errorDetail.errors.forEach(itm =>
                    {
                        this._notifications.error(itm);
                    })
                }
                
                if(errorDetail.validationErrors && this._serverValidationService)
                {
                    this._serverValidationService.addServerValidationErrors(errorDetail.validationErrors);
                }
            }
            
            return Observable.empty();
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