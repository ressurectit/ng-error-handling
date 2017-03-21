import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders, ValueProvider, ClassProvider, Type} from '@angular/core';
import {REPORTING_EXCEPTION_HANDLER_PROVIDER} from '../exceptionHandling/reportingExceptionHandler';
import {ReportingExceptionHandlerOptions} from '../exceptionHandling/reportingExceptionHandlerOptions';
import {ReportingExceptionHandlerService} from '../exceptionHandling/reportingExceptionHandler.service';

/**
 * Module for reporting exception handling
 */
@NgModule(
{
})
export class ExceptionHandlingModule
{
    //######################### public methods #########################
    
    /**
     * Returns module with reporting exception handler
     * @param {ReportingExceptionHandlerOptions} options Options passed to handler
     */
    public static forRoot(options?: ReportingExceptionHandlerOptions): ModuleWithProviders 
    {
        return {
            ngModule: ExceptionHandlingModule,
            providers: 
            [
                REPORTING_EXCEPTION_HANDLER_PROVIDER,
                <ValueProvider>
                {
                    provide: ReportingExceptionHandlerOptions,
                    useValue: options
                }
            ]
        };
    }

    /**
     * Returns module with reporting exception handler with reporting service
     * @param {ReportingExceptionHandlerOptions} options Options passed to handler
     * @param {Type<ReportingExceptionHandlerService>} reportingService Service used for reporting errors
     */
    public static forRootWithReportingService(reportingService: Type<ReportingExceptionHandlerService>, options?: ReportingExceptionHandlerOptions): ModuleWithProviders 
    {
        return {
            ngModule: ExceptionHandlingModule,
            providers: 
            [
                REPORTING_EXCEPTION_HANDLER_PROVIDER,
                <ValueProvider>
                {
                    provide: ReportingExceptionHandlerOptions,
                    useValue: options
                },
                <ClassProvider>
                {
                    provide: ReportingExceptionHandlerService,
                    useClass: reportingService
                }
            ]
        };
    }
}