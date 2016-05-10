import {Injectable} from '@angular/core';
import {isPresent} from '@angular/core/src/facade/lang';

/**
 * Options for HttpErrorInterceptor
 */
@Injectable()
export class HttpErrorInterceptorOptions
{
    //######################### public properties #########################
    
    /**
     * Indication whether run this interceptor in debug mode 
     */
    public debug: boolean = false;
    
    /**
     * Indication whether display validation messages globally
     */
    public globalValidationMessages: boolean = false;
    
    //######################### constructor #########################
    
    
    /**
     * Creates instance of HttpErrorInterceptorOptions
     * @param  {boolean} debug Indication whether run this interceptor in debug mode
     * @param  {boolean} globalValidationMessages Indication whether display validation messages globally
     */
    constructor(debug?: boolean, globalValidationMessages?: boolean)
    {
        if(isPresent(debug))
        {
            this.debug = debug;
        }
        
        if(isPresent(globalValidationMessages))
        {
            this.globalValidationMessages = globalValidationMessages;
        }
    }
}