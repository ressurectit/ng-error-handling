import {Injectable, Optional, provide, Provider} from 'angular2/core';
import {Response} from 'angular2/http';
import {HttpInterceptor, HTTP_INTERCEPTORS} from 'ng2-http-extensions/interceptableHttp';
import {HttpErrorInterceptorOptions} from './httpErrorInterceptorOptions';
import {Observable} from 'rxjs/Observable';
import {InternalServerErrorService} from './internalServerError.service';

/**
 * Interceptor that is used for handling http errors with codes 400, 404..599
 */
@Injectable()
export class HttpErrorInterceptor extends HttpInterceptor
{
    //######################### constructor #########################
    constructor(@Optional() private _options: HttpErrorInterceptorOptions,
                @Optional() private _internalServerErrorService: InternalServerErrorService)
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
                
                console.log(err);
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