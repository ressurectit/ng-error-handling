import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {DialogInternalServerErrorData} from './dialogInternalServerError.interface';

/**
 * Component used for displaying internal server error
 */
@Component(
{
    selector: 'dialog-internal-server-error',
    templateUrl: 'dialogInternalServerError.component.html',
    styleUrl: 'dialogInternalServerError.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogInternalServerErrorComponent
{
    //######################### constructor #########################
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogInternalServerErrorData,
                public dialog: MatDialogRef<DialogInternalServerErrorComponent>)
    {
    }
}
