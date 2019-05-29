import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ServerValidationValidatorDirective} from '../serverValidation/serverValidationValidator.directive';
import {ServerValidationMessagesComponent} from '../serverValidation/serverValidationMessages.component';
import {WithServerValidationsDirective} from '../serverValidation/withServerValidations.directive';

/**
 * Module for server validations
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [ServerValidationValidatorDirective, ServerValidationMessagesComponent, WithServerValidationsDirective],
    exports: [ServerValidationValidatorDirective, ServerValidationMessagesComponent, WithServerValidationsDirective]
})
export class ServerValidationsModule
{
}