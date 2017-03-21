import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {InternalServerErrorComponent} from '../internalServerError/internalServerError.component';
import {InternalServerErrorService} from '../internalServerError/internalServerError.service';

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
    //######################### public methods #########################
    
    /**
     * Returns module with internal server error service
     */
    public static forRoot(): ModuleWithProviders 
    {
        return {
            ngModule: InternalServerErrorModule,
            providers: [InternalServerErrorService]
        };
    }
}