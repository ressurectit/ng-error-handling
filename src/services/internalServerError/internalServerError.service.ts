import {Injectable} from '@angular/core';
import {isString} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

import {InternalServerErrorInfo} from '../../misc/classes/internalServerErrorInfo';

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
            id: this._id++,
        });
    }
}
