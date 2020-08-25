import {Attribute, ExistingProvider, forwardRef, Directive, OnInit, OnDestroy, Optional} from '@angular/core';
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

    //######################### private properties #########################

    /**
     * Gets control which was assigned to this element
     */
    private get control(): FormControl
    {
        return this._formControl?.control ?? this._formControlName?.control ?? this._ngModel.control;
    }

    //######################### constructor #########################
    constructor(@Attribute("serverValidation") private _serverValidation: string,
                private _serverValidationService: ServerValidationService,
                @Optional() private _formControl: FormControlDirective,
                @Optional() private _formControlName: FormControlName,
                @Optional() private _ngModel: NgModel)
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