import {Attribute, ExistingProvider, forwardRef, Directive, OnInit, OnDestroy, Injector} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControlDirective, FormControlName, FormControl, NgModel, ValidationErrors, AbstractControl} from '@angular/forms';
import {isEmptyObject} from '@jscrpt/common';
import {Subscription, filter} from 'rxjs';

import {ServerValidationService} from '../../services';

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
    selector: '[serverValidation][formControlName],[serverValidation][formControl],[serverValidation][ngModel]',
    providers: [SERVER_VALIDATIONS_VALIDATOR]
})
export class ServerValidationValidatorDirective implements Validator, OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Array of subscriptions that are destroyed on directive destroy
     */
    protected _subscriptions: Subscription = new Subscription();

    /**
     * Instance of control that is used
     */
    protected _control?: FormControl;

    /**
     * Name of control
     */
    protected _controlName!: string;

    //######################### protected properties #########################

    /**
     * Gets control which was assigned to this element
     */
    protected get control(): FormControl
    {
        return this._control ?? (this._control = this._injector.get(FormControlDirective, null)?.control ?? this._injector.get(FormControlName, null)?.control ?? this._injector.get(NgModel).control);
    }

    //######################### public properties #########################

    /**
     * Name of server property that is being validated by this
     */
    public get propertyName(): string
    {
        return this._controlName;
    }

    //######################### constructor #########################
    constructor(@Attribute('serverValidation') protected _serverValidation: string,
                @Attribute('formControlName') protected _formControlName: string,
                protected _serverValidationService: ServerValidationService,
                protected _injector: Injector)
    {
        if(!this._formControlName && !this._serverValidation)
        {
            throw new Error('Missing name of server validation property for "ServerValidationValidatorDirective"');
        }

        this._controlName = this._formControlName || this._serverValidation;
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._subscriptions.add(this._serverValidationService.serverValidationsChanged
                                    .pipe(filter(() => !!this._serverValidationService.serverValidations[this._controlName]))
                                    .subscribe(() => this.control.updateValueAndValidity()));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._subscriptions.unsubscribe();
    }

    //######################### public methods - implementation of Validator #########################

    /**
     * Validates input and returns validation result
     * @param control - Control that is being validated
     * @returns validation results
     */
    public validate(control: AbstractControl): ValidationErrors | null
    {
        const validationErrors = this._serverValidationService.serverValidations[this._controlName];

        if(validationErrors && !isEmptyObject(validationErrors))
        {
            return {
                ...validationErrors,
                actual: control.value
            };
        }

        return null;
    }
}