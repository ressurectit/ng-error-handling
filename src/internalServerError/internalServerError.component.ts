import {Component, OnDestroy, ChangeDetectionStrategy, Inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';

import {InternalServerErrorService, InternalServerErrorInfo, INTERNAL_SERVER_ERROR_RENDERER, InternalServerErrorRenderer} from './internalServerError.service';

/**
 * Displays internal server errors in modal dialog
 */
@Component(
{
    selector: "internal-server-error",
    templateUrl: 'internalServerError.component.html',
    styleUrls: ['internalServerError.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InternalServerErrorComponent implements OnDestroy
{
    //######################### private fields #########################
    
    /**
     * Subscription for internalServerErrorService changed event
     */
    private _subscription: Subscription = null;
    
    //######################### public properties #########################

    /**
     * Array of html errors that should be displayed
     */
    public errorsHtml: InternalServerErrorInfo[] = [];

    //######################### constructor #########################
    constructor(internalServerErrorService: InternalServerErrorService,
                sanitizerService: DomSanitizer,
                @Inject(INTERNAL_SERVER_ERROR_RENDERER) private _renderer: InternalServerErrorRenderer)
    {
        this._subscription = internalServerErrorService.internalServerErrorOccured.subscribe((itm: InternalServerErrorInfo) =>
        {
            itm.errorHtml = sanitizerService.bypassSecurityTrustResourceUrl('data:text/html;charset=utf-8,' + encodeURI(<string>itm.errorHtml).replace(/#/g, "%23"));

            this.errorsHtml.push(itm);
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        this._subscription?.unsubscribe();
        this._subscription = null;
    }

    //######################### public methods - template bindings #########################

    /**
     * Shows error info in provided renderer
     * @param errorInfo - Error info to be displayed
     */
    public show(errorInfo: InternalServerErrorInfo)
    {
        this._renderer.show(errorInfo, this.removeReport.bind(this));
    }

    /**
     * Removes displayed report
     * @param errorInfo - Report to be removed
     */
    public removeReport(errorInfo: InternalServerErrorInfo)
    {
        let index = this.errorsHtml.indexOf(errorInfo);

        if(index >= 0)
        {
            this.errorsHtml.splice(index, 1);
        }
    }
}