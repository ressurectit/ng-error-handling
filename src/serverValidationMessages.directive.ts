import {NgControlName, NgFormControl, Control} from 'angular2/common';
import {Directive, TemplateRef, ViewContainerRef, Input, OnDestroy, OnInit} from 'angular2/core';
import {ServerValidationService} from './serverValidation.service';
import {SERVER_VALIDATIONS} from './serverValidationValidator.directive';
import {Subscription} from 'rxjs/Subscription';

/**
 * Directive that is used for displaying server validation messages
 */
@Directive(
{
    selector: "[serverValidations]",
})
export class ServerValidationMessagesDirective implements OnDestroy, OnInit
{
    //######################### private fields #########################

    /**
     * Control which server validation errors are displayed
     */
    private _controlDirective: {control: Control};
    
    /**
     * Subscription that is obtained from subscribing
     */
    private _subscription: Subscription = null;

    //######################### private fields #########################

    /**
     * Control which server validation errors are displayed
     */
    @Input()
    public set serverValidationsInput(control: any)
    {
        if(!(control instanceof NgControlName) && !(control instanceof NgFormControl))
        {
            throw new Error("Unable to assign serverValidationsInput, because it is not NgFormControl or NgControlName instance");
        }

        this._controlDirective = control;
    }

    //######################### constructor #########################

    /**
     * Creates instance of MessageTemplate
     */
    constructor(private _template: TemplateRef,
                private _viewContainer: ViewContainerRef,
                private _serverValidationService: ServerValidationService)
    {
    }
    
    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        if(!this._controlDirective)
        {
            throw new Error("You must set 'serverValidationsInput' before use!");
        }
        
        this._subscription = this._serverValidationService.serverValidationsChanged.subscribe(itm =>
        {
            this._viewContainer.clear();

            if(itm)
            {
                this._controlDirective.control.updateValueAndValidity(
                {
                    onlySelf: false,
                    emitEvent: true
                });

                if(this._controlDirective.control.errors[SERVER_VALIDATIONS])
                {
                    (<string[]>this._controlDirective.control.errors[SERVER_VALIDATIONS]).forEach(message =>
                    {
                        var view = this._viewContainer.createEmbeddedView(this._template);
                        view.setLocal('\$implicit', message);

                        this._viewContainer.insert(view);
                    })
                }
            }
        });
    }
    
    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        this._subscription.unsubscribe();
        this._subscription = null;
    }
}