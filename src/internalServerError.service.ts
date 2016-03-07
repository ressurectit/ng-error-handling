import {Injectable, EventEmitter} from 'angular2/core';

/**
 * Internal server error information
 */
export class InternalServerErrorInfo
{
    /**
     * Id of error
     */
    id: number;
    
    /**
     * Html displaying info about error
     */
    errorHtml: string;
    
    /**
     * Request url that was called and caused error
     */
    requestUrl: string;
} 

/**
 * Service that is used for displaying internal server errors in InternalServerError component
 */
@Injectable()
export class InternalServerErrorService
{
    //######################### private fields #########################
    
    /**
     * Id of displayed error
     */
    private _id: number = 0;
    
    //######################### public properties #########################
    
    /**
     * Occurs when internal server occurs during http request
     */
    public internalServerErrorOccured: EventEmitter<InternalServerErrorInfo> = new EventEmitter(); 
    
    //######################### public methods #########################
    
    /**
     * Displays internal server error as dialog 
     * @param  {string} errorHtml Html that will be displayed in dialog
     * @param  {string} requestUrl Url of request that ended with internal server error
     */
    public showInternalServerError(errorHtml: string, requestUrl: string)
    {
        this.internalServerErrorOccured.emit(
        {
            errorHtml: errorHtml,
            requestUrl: requestUrl,
            id: this._id++
        });
    }
}