import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServerValidationValidatorDirective} from '../serverValidation/serverValidationValidator.directive';

/**
 * Module for server validations
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [ServerValidationValidatorDirective],
    exports: [ServerValidationValidatorDirective]
})
export class ServerValidationsModule
{
}