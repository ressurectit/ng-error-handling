import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {ServerValidationValidatorDirective} from '../serverValidation/serverValidationValidator.directive';
import {ServerValidationMessagesComponent} from '../serverValidation/serverValidationMessages.component';
import {WithServerValidationsDirective} from '../serverValidation/withServerValidations.directive';
import {ServerValidationService} from '../serverValidation/serverValidation.service';

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
    //######################### public methods #########################
    
    /**
     * Returns module with server validation service
     */
    public static forRoot(): ModuleWithProviders 
    {
        return {
            ngModule: ServerValidationsModule,
            providers: [ServerValidationService]
        };
    }
}