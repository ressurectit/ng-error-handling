import {NgModule, ModuleWithProviders, FactoryProvider, ValueProvider} from '@angular/core';
import {ERROR_RESPONSE_MAP_PROVIDER, HTTP_ERROR_INTERCEPTOR_PROVIDER, ResponseMapperFunction} from '../httpErrorInterceptor/httpErrorInterceptor';
import {HttpErrorInterceptorOptions} from '../httpErrorInterceptor/httpErrorInterceptorOptions';

/**
 * Module for http error interceptor
 */
@NgModule(
{
})
export class HttpErrorInterceptorModule
{
    //######################### public methods #########################

    /**
     * Returns module with http interceptor with default options
     */
    public static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: HttpErrorInterceptorModule,
            providers:
            [
                HTTP_ERROR_INTERCEPTOR_PROVIDER
            ]
        };
    }

    /**
     * Returns module with http interceptor with default options and mapping function
     * @param {ResponseMapperFunction} mappingFunction Mapping function that maps error response from server to appropriate type
     */
    public static forRootWithMapFunction(mappingFunction: ResponseMapperFunction): ModuleWithProviders
    {
        return {
            ngModule: HttpErrorInterceptorModule,
            providers:
            [
                HTTP_ERROR_INTERCEPTOR_PROVIDER,
                <ValueProvider>
                {
                    provide: ERROR_RESPONSE_MAP_PROVIDER,
                    useValue: mappingFunction
                }
            ]
        };
    }

    /**
     * Returns module with http interceptor with specified options
     * @param {() => HttpErrorInterceptorOptions} options Options used for http error interceptor
     */
    public static forRootWithOptions(options: () => HttpErrorInterceptorOptions): ModuleWithProviders
    {
        return {
            ngModule: HttpErrorInterceptorModule,
            providers:
            [
                HTTP_ERROR_INTERCEPTOR_PROVIDER,
                <FactoryProvider>
                {
                    provide: HttpErrorInterceptorOptions,
                    useFactory: options
                }
            ]
        };
    }

    /**
     * Returns module with http interceptor with specified options and mapping function
     * @param {() => HttpErrorInterceptorOptions} options Options used for http error interceptor
     * @param {ResponseMapperFunction} mappingFunction Mapping function that maps error response from server to appropriate type
     */
    public static forRootWithMapFunctionAndOptions(options: () => HttpErrorInterceptorOptions, mappingFunction: ResponseMapperFunction): ModuleWithProviders
    {
        return {
            ngModule: HttpErrorInterceptorModule,
            providers:
            [
                HTTP_ERROR_INTERCEPTOR_PROVIDER,
                <FactoryProvider>
                {
                    provide: HttpErrorInterceptorOptions,
                    useFactory: options
                },
                <ValueProvider>
                {
                    provide: ERROR_RESPONSE_MAP_PROVIDER,
                    useValue: mappingFunction
                }
            ]
        };
    }
}