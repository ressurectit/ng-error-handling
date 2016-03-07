import {Injectable} from 'angular2/core';

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
    public debug: boolean;
    
    //######################### constructor #########################
    
    
    /**
     * Creates instance of HttpErrorInterceptorOptions
     * @param  {boolean} debug Indication whether run this interceptor in debug mode
     */
    constructor(debug: boolean)
    {
        this.debug = debug;
    }
}