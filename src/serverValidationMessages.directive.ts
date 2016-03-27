import {Control} from 'angular2/common';
import {Directive, TemplateRef, ViewContainerRef, Input, OnDestroy} from 'angular2/core';
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
export class ServerValidationMessages implements OnDestroy
{
    //######################### private fields #########################

    /**
     * Control which server validation errors are displayed
     */
    private _control: Control;
    
    /**
     * Subscription that is obtained from subscribing
     */
    private _subscription: Subscription = null;

    //######################### private fields #########################

    /**
     * Control which server validation errors are displayed
     */
    @Input()
    public set serverValidationsInput(control: Control)
    {
        if(!(control instanceof Control))
        {
            throw new Error("Unable to assign serverValidationsInput, because it is not Control instance");
        }

        this._control = control;
    }

    //######################### constructor #########################

    /**
     * Creates instance of MessageTemplate
     */
    constructor(template: TemplateRef,
                viewContainer: ViewContainerRef,
                serverValidationService: ServerValidationService)
    {
        if(!this._control)
        {
            throw new Error("You must set 'serverValidationsInput' before use!");
        }
        
        this._subscription = serverValidationService.serverValidationsChanged.subscribe(itm =>
        {
            viewContainer.clear();

            if(itm)
            {
                this._control.updateValueAndValidity(
                {
                    onlySelf: false,
                    emitEvent: true
                });

                if(this._control.errors[SERVER_VALIDATIONS])
                {
                    (<string[]>this._control.errors[SERVER_VALIDATIONS]).forEach(message =>
                    {
                        var view = viewContainer.createEmbeddedView(template);
                        view.setLocal('\$implicit', message);

                        viewContainer.insert(view);
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