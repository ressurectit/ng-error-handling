import {Injectable, InjectionToken} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {isString} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

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
    errorHtml: SafeResourceUrl;

    /**
     * Request url that was called and caused error
     */
    requestUrl: string;
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
    public showInternalServerError(errorHtml: string, requestUrl: string)
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
class DummyInternalServerErrorRenderer implements InternalServerErrorRenderer
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

/**
 * Injection token used for InternalServerErrorRenderer
 */
export const INTERNAL_SERVER_ERROR_RENDERER: InjectionToken<InternalServerErrorRenderer> = new InjectionToken<InternalServerErrorRenderer>('INTERNAL_SERVER_ERROR_RENDERER', {providedIn: 'root', factory: () => new DummyInternalServerErrorRenderer()});