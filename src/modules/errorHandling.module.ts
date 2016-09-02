import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ServerValidationValidatorDirective} from '../serverValidation/serverValidationValidator.directive';
import {ServerValidationMessagesComponent} from '../serverValidation/serverValidationMessages.component';
import {WithServerValidationsDirective} from '../serverValidation/withServerValidations.directive';
import {InternalServerErrorComponent} from '../internalServerError/internalServerError.component';

/**
 * Module for error handling
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [ServerValidationValidatorDirective, ServerValidationMessagesComponent, WithServerValidationsDirective, InternalServerErrorComponent],
    exports: [ServerValidationValidatorDirective, ServerValidationMessagesComponent, WithServerValidationsDirective, InternalServerErrorComponent]
})
export class ErrorHandlingModule
{
}