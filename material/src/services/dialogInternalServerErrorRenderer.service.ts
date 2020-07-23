import {Injectable} from '@angular/core';
import {} from '@angular/material';
import {InternalServerErrorInfo, InternalServerErrorRenderer} from '@anglr/error-handling';

/**
 * 
 */
@Injectable()
export class DialogInternalServerErrorRenderer implements InternalServerErrorRenderer
{
    //######################### constructor #########################
    constructor(private _dialogSvc: )
    {
    }

    //######################### public methods - implementation of InternalServerErrorRenderer #########################

    /**
     * Displays pure response for internal server error 5xx error codes
     * @param errorInfo - Error info to be displayed
     * @param deleteCallback - Callback called when displayed error request removal of error
     */
    public show(errorInfo: InternalServerErrorInfo, deleteCallback: (errorInfo: InternalServerErrorInfo) => void): void
    {
        
    }
}