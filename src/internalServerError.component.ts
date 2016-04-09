import {Component, Directive, ElementRef, OnDestroy} from 'angular2/core';
import {InternalServerErrorService, InternalServerErrorInfo} from './internalServerError.service';
import {Subscription} from 'rxjs/Subscription';

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
    template:
   `<div class="internal-server-error-notification">
        <div class="notification" data-toggle="collapse" data-target="#internalServerErrorsList" [hidden]="errorsHtml.length < 1">!</div>

        <div id="internalServerErrorsList" class="collapse">
            <div *ngFor="#error of errorsHtml">
                <span style="padding-left: 8px;">{{error.requestUrl}}</span>
                <button type="button" class="btn btn-link" data-toggle="modal" [attr.data-target]="'#myModal' + error.id">show</button>
                <button type="button" class="btn btn-link" title="Remove report" (click)="removeReport(error)">
                    <span class="glyphicon glyphicon-remove" style="color: #FF0000;"></span>
                </button>
            </div>
        </div>
    </div>

    <div *ngFor="#error of errorsHtml">
        <div class="modal fade" [id]="'myModal' + error.id" tabindex="-1">
            <div class="modal-dialog" style="width: 80%;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Internal server error - {{error.requestUrl}}</h4>
                    </div>

                    <div class="modal-body">
                        <iframe style="height: 450px; width: 100%; border: 0 none;" [src]="error.errorHtml"></iframe>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" (click)="removeReport(error)">
                            <span class="glyphicon glyphicon-trash"></span>
                            <span>Delete report</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
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
    constructor(internalServerErrorService: InternalServerErrorService)
    {
        this._subscription = internalServerErrorService.internalServerErrorOccured.subscribe((itm: InternalServerErrorInfo) =>
        {
            itm.errorHtml = 'data:text/html;charset=utf-8,' + encodeURI(itm.errorHtml).replace(/#/g, "%23");

            this.errorsHtml.push(itm);
        });
    }

    //######################### public methods #########################
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