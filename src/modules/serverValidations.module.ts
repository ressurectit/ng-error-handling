import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ServerValidationValidatorDirective} from '../serverValidation/serverValidationValidator.directive';
import {ServerValidationMessagesComponent} from '../serverValidation/serverValidationMessages.component';

/**
 * Module for server validations
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [ServerValidationValidatorDirective, ServerValidationMessagesComponent],
    exports: [ServerValidationValidatorDirective, ServerValidationMessagesComponent]
})
export class ServerValidationsModule
{
}