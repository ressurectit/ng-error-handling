import {Attribute, ExistingProvider, forwardRef, Directive, OnInit, OnDestroy, Injector} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControlDirective, FormControlName, FormControl, NgModel} from '@angular/forms';
import {Dictionary} from '@jscrpt/common';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

import {ServerValidationService} from './serverValidation.service';

/**
 * Name of server validations as error
 */
export const SERVER_VALIDATIONS = "serverValidation";

/**
 * Validator that is injected with directive ServerValidationValidator
 */
export const SERVER_VALIDATIONS_VALIDATOR: ExistingProvider = 
{
    provide: NG_VALIDATORS, 
    useExisting: forwardRef(() => ServerValidationValidatorDirective), 
    multi: true
};

/**
 * Server validation directive injecting server validations validator
 */
@Directive(
{
    selector: "[serverValidation][formControlName],[serverValidation][formControl],[serverValidation][ngModel]",
    providers: [SERVER_VALIDATIONS_VALIDATOR]
})
export class ServerValidationValidatorDirective implements Validator, OnInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Array of subscriptions that are destroyed on directive destroy
     */
    private _subscriptions: Subscription = new Subscription();

    /**
     * Instance of control that is used
     */
    private _control: FormControl;

    //######################### private properties #########################

    /**
     * Gets control which was assigned to this element
     */
    private get control(): FormControl
    {
        return this._control ?? (this._control = this._injector.get(FormControlDirective, null)?.control ?? this._injector.get(FormControlName, null)?.control ?? this._injector.get(NgModel, null).control);
    }

    //######################### constructor #########################
    constructor(@Attribute("serverValidation") private _serverValidation: string,
                private _serverValidationService: ServerValidationService,
                private _injector: Injector)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._subscriptions.add(this._serverValidationService.serverValidationsChanged
                                    .pipe(filter(() => !!this._serverValidationService.serverValidations[this._serverValidation]))
                                    .subscribe(() => this.control.updateValueAndValidity()));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        this._subscriptions.unsubscribe();
    }

    //######################### public methods - implementation of Validator #########################

    /**
     * Validates input and returns validation result
     * @param control - Control that is being validated
     * @returns validation results
     */
    public validate(): Dictionary
    {
        if(this._serverValidationService.serverValidations[this._serverValidation])
        {
            let result: Dictionary = {};
            result[SERVER_VALIDATIONS] = this._serverValidationService.serverValidations[this._serverValidation];

            return result;
        }

        return null;
    }
}