import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InternalServerErrorComponent} from '../internalServerError/internalServerError.component';

/**
 * Module for internal server error handling
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [InternalServerErrorComponent],
    exports: [InternalServerErrorComponent]
})
export class InternalServerErrorModule
{
}