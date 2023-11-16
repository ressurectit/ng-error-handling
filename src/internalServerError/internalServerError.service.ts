import {Injectable} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {isString} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

/**
 * Internal server error information
 */
export class InternalServerErrorInfo
{
    //######################### constructor #########################

    /**
     * Creates instance of `InternalServerErrorInfo`
     * @param id - Id of error
     * @param errorHtml - Html displaying info about error
     * @param requestUrl - Request url that was called and caused error
     */
    constructor(public id: number, public errorHtml: SafeResourceUrl, public requestUrl: string)
    {
    }
}

/**
 * Service that is used for displaying internal server errors in InternalServerError component
 */
@Injectable({providedIn: 'root'})
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
    private _internalServerErrorOccuredSubject: Subject<InternalServerErrorInfo> = new Subject<InternalServerErrorInfo>();

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
     * @param errorHtml - Html that will be displayed in dialog
     * @param requestUrl - Url of request that ended with internal server error
     */
    public showInternalServerError(errorHtml: string, requestUrl: string): void
    {
        if(!isString(errorHtml))
        {
            errorHtml = JSON.stringify(errorHtml);
        }

        this._internalServerErrorOccuredSubject.next(
        {
            errorHtml: errorHtml,
            requestUrl: requestUrl,
            id: this._id++
        });
    }
}

/**
 * Renderer used for displaying/rendering internal server error
 */
export interface InternalServerErrorRenderer
{
    /**
     * Displays pure response for internal server error 5xx error codes
     * @param errorInfo - Error info to be displayed
     * @param deleteCallback - Callback called when displayed error request removal of error
     */
    show(errorInfo: InternalServerErrorInfo, deleteCallback: (errorInfo: InternalServerErrorInfo) => void): void;
}

/**
 * Dummy renderer used for displaying/rendering internal server error
 */
export class DummyInternalServerErrorRenderer implements InternalServerErrorRenderer
{
    //######################### public methods - implementation of InternalServerErrorRenderer #########################

    /**
     * Displays pure response for internal server error 5xx error codes
     * @param errorInfo - Error info to be displayed
     * @param deleteCallback - Callback called when displayed error request removal of error
     */
    public show(_errorInfo: InternalServerErrorInfo, _deleteCallback: (errorInfo: InternalServerErrorInfo) => void): void
    {
    }
}
