import {NgModule, ModuleWithProviders, FactoryProvider, ClassProvider, Type} from '@angular/core';
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
     * Returns module with reporting exception handler with default options
     */
    public static forRoot(): ModuleWithProviders 
    {
        return {
            ngModule: ExceptionHandlingModule,
            providers: 
            [
                REPORTING_EXCEPTION_HANDLER_PROVIDER
            ]
        };
    }

    /**
     * Returns module with reporting exception handler
     * @param {() =>ReportingExceptionHandlerOptions} options Options passed to handler
     */
    public static forRootWithOptions(options: () => ReportingExceptionHandlerOptions): ModuleWithProviders 
    {
        return {
            ngModule: ExceptionHandlingModule,
            providers: 
            [
                REPORTING_EXCEPTION_HANDLER_PROVIDER,
                <FactoryProvider>
                {
                    provide: ReportingExceptionHandlerOptions,
                    useFactory: options
                }
            ]
        };
    }

    /**
     * Returns module with reporting exception handler with reporting service
     * @param {Type<ReportingExceptionHandlerService>} reportingService Service used for reporting errors
     */
    public static forRootWithReportingService(reportingService: Type<ReportingExceptionHandlerService>): ModuleWithProviders 
    {
        return {
            ngModule: ExceptionHandlingModule,
            providers: 
            [
                REPORTING_EXCEPTION_HANDLER_PROVIDER,
                <ClassProvider>
                {
                    provide: ReportingExceptionHandlerService,
                    useClass: reportingService
                }
            ]
        };
    }

    /**
     * Returns module with reporting exception handler with reporting service
     * @param {Type<ReportingExceptionHandlerService>} reportingService Service used for reporting errors
     * @param {() => ReportingExceptionHandlerOptions} options Options passed to handler
     */
    public static forRootWithReportingServiceAndOptions(reportingService: Type<ReportingExceptionHandlerService>, options: () => ReportingExceptionHandlerOptions): ModuleWithProviders 
    {
        return {
            ngModule: ExceptionHandlingModule,
            providers: 
            [
                REPORTING_EXCEPTION_HANDLER_PROVIDER,
                <FactoryProvider>
                {
                    provide: ReportingExceptionHandlerOptions,
                    useFactory: options
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