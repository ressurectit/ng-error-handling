import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

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
    
    /**
     * Subject used for emitting internalServerErrorOccuredin
     */
    private _internalServerErrorOccuredSubject: Subject<InternalServerErrorInfo> = new Subject();
    
    //######################### public properties #########################
    
    /**
     * Occurs when internal server occurs during http request
     */
    public get internalServerErrorOccured(): Observable<InternalServerErrorInfo>
    {
        return this._internalServerErrorOccuredSubject.asObservable(); 
    } 
    
    //######################### public methods #########################
    
    /**
     * Displays internal server error as dialog 
     * @param  {string} errorHtml Html that will be displayed in dialog
     * @param  {string} requestUrl Url of request that ended with internal server error
     */
    public showInternalServerError(errorHtml: string, requestUrl: string)
    {
        this._internalServerErrorOccuredSubject.next(
        {
            errorHtml: errorHtml,
            requestUrl: requestUrl,
            id: this._id++
        });
    }
}