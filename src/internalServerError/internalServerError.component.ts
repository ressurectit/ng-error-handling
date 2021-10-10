import {Component, OnDestroy, ChangeDetectionStrategy, Inject, ChangeDetectorRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';

import {InternalServerErrorService, InternalServerErrorInfo, INTERNAL_SERVER_ERROR_RENDERER, InternalServerErrorRenderer} from './internalServerError.service';

/**
 * Displays internal server errors in modal dialog
 */
@Component(
{
    selector: 'internal-server-error',
    templateUrl: 'internalServerError.component.html',
    styleUrls: ['internalServerError.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InternalServerErrorComponent implements OnDestroy
{
    //######################### private fields #########################
    
    /**
     * Subscription for internalServerErrorService changed event
     */
    private _subscription: Subscription = null;
    
    //######################### public properties - template bindings #########################

    /**
     * Array of html errors that should be displayed
     * @internal
     */
    public errorsHtml: InternalServerErrorInfo[] = [];

    /**
     * Indication whether are errors visible
     * @internal
     */
    public errorsVisible: boolean = false;

    //######################### constructor #########################
    constructor(internalServerErrorService: InternalServerErrorService,
                sanitizerService: DomSanitizer,
                @Inject(INTERNAL_SERVER_ERROR_RENDERER) private _renderer: InternalServerErrorRenderer,
                private _changeDetector: ChangeDetectorRef)
    {
        this._subscription = internalServerErrorService.internalServerErrorOccured.subscribe((itm: InternalServerErrorInfo) =>
        {
            itm.errorHtml = sanitizerService.bypassSecurityTrustResourceUrl('data:text/html;charset=utf-8,' + encodeURI(<string>itm.errorHtml).replace(/#/g, '%23'));

            this.errorsHtml.push(itm);
            _changeDetector.detectChanges();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._subscription?.unsubscribe();
        this._subscription = null;
    }

    //######################### public methods - template bindings #########################

    /**
     * Shows error info in provided renderer
     * @param errorInfo - Error info to be displayed
     */
    public show(errorInfo: InternalServerErrorInfo): void
    {
        this._renderer.show(errorInfo, this.removeReport.bind(this));
    }

    /**
     * Removes displayed report
     * @param errorInfo - Report to be removed
     */
    public removeReport(errorInfo: InternalServerErrorInfo): void
    {
        const index = this.errorsHtml.indexOf(errorInfo);

        if(index >= 0)
        {
            this.errorsHtml.splice(index, 1);
        }

        if(!this.errorsHtml.length)
        {
            this.errorsVisible = false;
        }

        this._changeDetector.detectChanges();
    }
}