import {Control} from 'angular2/common';
import {Directive, TemplateRef, ViewContainerRef} from 'angular2/core';
import {ServerValidationService} from './serverValidation.service';
import {SERVER_VALIDATIONS} from './serverValidationValidator.directive';

/**
 * Directive that is used for displaying server validation messages
 */
@Directive(
{
    selector: "[serverValidations]",
    inputs: ['serverValidationsInput']
})
export class ServerValidationMessages
{
    //######################### private fields #########################

    /**
     * Control which server validation errors are displayed
     */
    private _control: Control;

    //######################### private fields #########################

    /**
     * Control which server validation errors are displayed
     */
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
        serverValidationService.serverValidationsChanged.subscribe(itm =>
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
                        view.setLocal("message", message);

                        viewContainer.insert(view);
                    })
                }
            }
        })
    }
}