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
    styleUrls: ['dialogInternalServerError.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogInternalServerErrorSAComponent
{
    //######################### constructor #########################
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogInternalServerErrorData,
                public dialog: MatDialogRef<DialogInternalServerErrorSAComponent>)
    {
    }
}