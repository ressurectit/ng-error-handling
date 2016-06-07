import {Directive, Optional, OnDestroy} from '@angular/core';
import {ControlGroup, NgForm, NgFormModel} from '@angular/common';
import {ServerValidationService} from './serverValidation.service';
import {Subscription} from 'rxjs/Subscription';

/**
 * Directive that runs form validations when server validation has changed
 */
@Directive(
{
    selector: "form[withServerValidations]"
})
export class WithServerValidationsDirective implements OnDestroy
{
    //######################### private fields #########################

    /**
     * Form group that contains controls that needs to be validated
     */
    private _form: ControlGroup;

    /**
     * Subscription of changes in server validations
     */
    private _subscription: Subscription; 

    //######################### constructor #########################
    constructor(serviceValidationSvc: ServerValidationService,
                @Optional() ngForm: NgForm,
                @Optional() ngFormModel: NgFormModel)
    {
        if(ngForm)
        {
            this._form = ngForm.form;
        }

        if(ngFormModel)
        {
            this._form = ngFormModel.form;
        }

        if(!this._form)
        {
            throw new Error("There is no form directive!");
        }

        this._subscription = serviceValidationSvc.serverValidationsChanged.subscribe(changes =>
        {
            Object.keys(this._form.controls).forEach(controlName =>
            {
                this._form.controls[controlName].updateValueAndValidity({emitEvent: true, onlySelf: false});
            });
        });
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