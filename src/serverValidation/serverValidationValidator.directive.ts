import {NG_VALIDATORS,
        AbstractControl, 
        Validator} from '@angular/forms';
import {Attribute,
        ExistingProvider,
        forwardRef,
        TemplateRef,
        ViewContainerRef,
        Directive} from '@angular/core';
import {ServerValidationService} from './serverValidation.service';

/**
 * Name of server validations as error
 */
export const SERVER_VALIDATIONS = "serverValidation";

/**
 * Validator that is injected with directive ServerValidationValidator
 */
const SERVER_VALIDATIONS_VALIDATOR: ExistingProvider = 
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
export class ServerValidationValidatorDirective implements Validator
{
    //######################### constructor #########################
    constructor(@Attribute("serverValidation") private _serverValidation: string,
                private _serverValidationService: ServerValidationService)
    {
    }

    //######################### public methods - implementation of Validator #########################

    /**
     * Validates input and returns validation result
     * @param  {Control} control Control that is being validated
     * @returns {[key: string]: any} validation results
     */
    validate(control: AbstractControl): {[key: string]: any}
    {
        if(this._serverValidationService.serverValidations[this._serverValidation])
        {
            var result = {};
            result[SERVER_VALIDATIONS] = this._serverValidationService.serverValidations[this._serverValidation];

            return result;
        }

        return null;
    }
}