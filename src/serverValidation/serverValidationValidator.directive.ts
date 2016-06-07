import {NG_VALIDATORS,
        Control, 
        Validator} from '@angular/common';
import {Attribute,
        Provider,
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
const SERVER_VALIDATIONS_VALIDATOR = new Provider(NG_VALIDATORS, {useExisting: forwardRef(() => ServerValidationValidatorDirective), multi: true});

/**
 * Server validation directive injecting server validations validator
 */
@Directive(
{
    selector: "[serverValidation]",
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
    validate(control: Control): {[key: string]: any}
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