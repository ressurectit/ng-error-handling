import {Attribute, ExistingProvider, forwardRef, Directive} from '@angular/core';
import {NG_VALIDATORS, Validator} from '@angular/forms';

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
     * @param control - Control that is being validated
     * @returns validation results
     */
    validate(): {[key: string]: any}
    {
        if(this._serverValidationService.serverValidations[this._serverValidation])
        {
            var result: {[key: string]: any} = {};
            result[SERVER_VALIDATIONS] = this._serverValidationService.serverValidations[this._serverValidation];

            return result;
        }

        return null;
    }
}