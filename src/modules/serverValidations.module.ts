import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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