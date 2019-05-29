import {Component, OnDestroy} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';

import {InternalServerErrorService, InternalServerErrorInfo} from './internalServerError.service';

/**
 * Displays internal server errors in bootstrap modal dialog
 */
@Component(
{
    selector: "internal-server-error",
    styles:
    [`
        .internal-server-error-notification
        {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1000;
        }

        .internal-server-error-notification > .notification
        {
            color: #ff0000;
            float: right;
            font-size: 3em;
            font-weight: bold;
            padding: 4px 16px;
            animation-name: notification-blink;
            animation-duration: 500ms;
            animation-iteration-count: infinite;
            cursor: pointer;
        }
        
        .internal-server-error-notification > #internalServerErrorsList
        {
            background-color: #fff;
            box-shadow: 0 0 3px #000;
            float: left;
            margin-top: 18px;
        }

        @keyframes notification-blink
        {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
    `],
    templateUrl: 'internalServerError.component.html'
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
                sanitizerService: DomSanitizer)
    {
        this._subscription = internalServerErrorService.internalServerErrorOccured.subscribe((itm: InternalServerErrorInfo) =>
        {
            itm.errorHtml = sanitizerService.bypassSecurityTrustResourceUrl('data:text/html;charset=utf-8,' + encodeURI(<string>itm.errorHtml).replace(/#/g, "%23"));

            this.errorsHtml.push(itm);
        });
    }

    //######################### public methods #########################
    
    /**
     * Removes displayed report
     * @param itm Report to be removed
     */
    public removeReport(itm: InternalServerErrorInfo)
    {
        var index = this.errorsHtml.indexOf(itm);

        if(index >= 0)
        {
            this.errorsHtml.splice(index, 1);
        }
    }
    
    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._subscription)
        {
            this._subscription.unsubscribe();
            this._subscription = null;
        }
    }
}