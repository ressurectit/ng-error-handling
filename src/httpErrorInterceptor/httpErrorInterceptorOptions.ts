import {HttpErrorResponse} from '@angular/common/http';
import {isPresent} from '@anglr/common';

/**
 * Options for HttpErrorInterceptor
 */
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

    /**
     * Predicate that is used for testing whether response should be handled by HttpErrorInterceptor
     */
    public shouldHandlePredicate: (response: HttpErrorResponse) => boolean = response => response.status == 400 || response.status > 404;
    
    //######################### constructor #########################
    
    
    /**
     * Creates instance of HttpErrorInterceptorOptions
     * @param  {boolean} debug Indication whether run this interceptor in debug mode
     * @param  {boolean} globalValidationMessages Indication whether display validation messages globally
     * @param  {(response: HttpErrorResponse) => boolean} shouldHandlePredicate Predicate that is used for testing whether response should be handled by HttpErrorInterceptor
     */
    constructor(debug?: boolean, globalValidationMessages?: boolean, shouldHandlePredicate?: (response: HttpErrorResponse) => boolean)
    {
        if(isPresent(debug))
        {
            this.debug = debug;
        }
        
        if(isPresent(globalValidationMessages))
        {
            this.globalValidationMessages = globalValidationMessages;
        }

        if(isPresent(shouldHandlePredicate))
        {
            this.shouldHandlePredicate = shouldHandlePredicate;
        }
    }
}