import {Directive, OnDestroy} from '@angular/core';
import {ControlContainer, FormGroup, FormArray} from '@angular/forms';
import {Subscription} from 'rxjs';

import {ServerValidationService} from './serverValidation.service';

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
     * Form group or form array containing controls
     */
    private _form: FormGroup | FormArray;

    /**
     * Subscription of changes in server validations
     */
    private _subscription: Subscription; 

    //######################### constructor #########################
    constructor(serviceValidationSvc: ServerValidationService,
                form: ControlContainer)
    {
        if(!(form.control instanceof FormArray) && !(form.control instanceof FormGroup))
        {
            throw new Error("Wrong type of control type should be 'FormGroup' or 'FormArray'!");
        }

        this._form = <FormGroup|FormArray>form.control;

        this._subscription = serviceValidationSvc.serverValidationsChanged.subscribe(() =>
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