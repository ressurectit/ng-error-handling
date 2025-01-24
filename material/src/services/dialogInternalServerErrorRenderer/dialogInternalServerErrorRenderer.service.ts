import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InternalServerErrorInfo, InternalServerErrorRenderer} from '@anglr/error-handling';

import {DialogInternalServerErrorComponent} from '../../components/dialogInternalServerError/dialogInternalServerError.component';
import {DialogInternalServerErrorData} from '../../components/dialogInternalServerError/dialogInternalServerError.interface';

/**
 * Renderer that is using angular material for displaying internal server error
 */
@Injectable()
export class DialogInternalServerErrorRenderer implements InternalServerErrorRenderer
{
    //######################### constructor #########################
    constructor(private _dialog: MatDialog)
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
        this._dialog.open<DialogInternalServerErrorComponent, DialogInternalServerErrorData>(DialogInternalServerErrorComponent,
        {
            width: '90vw',
            height: '90vh',
            data:
            {
                errorInfo,
                deleteCallback,
            },
        });
    }
}
