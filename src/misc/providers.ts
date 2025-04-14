import {ClassProvider, EnvironmentProviders, FactoryProvider, Provider, Type, ValueProvider, makeEnvironmentProviders, inject} from '@angular/core';
import {extend} from '@jscrpt/common/extend';

import {ANGLR_EXCEPTION_EXTENDERS, HTTP_CLIENT_ERROR_HANDLERS, HTTP_CLIENT_ERROR_CONFIGS, HTTP_CLIENT_ERROR_RESPONSE_MAPPER, HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER, INTERNAL_SERVER_ERROR_RENDERER} from './tokens';
import {AnglrExceptionExtender, InternalServerErrorRenderer} from '../interfaces';
import {HttpClientErrorConfigs, HttpClientErrorHandlers, HttpClientErrorResponseMapper, HttpClientValidationErrorResponseMapper} from './types';

/**
 * Provides anglr exception extends functions
 * @param extenders - Array of extender function
 */
export function provideAnglrExceptionExtenders(extenders: AnglrExceptionExtender[]): EnvironmentProviders
{
    return makeEnvironmentProviders(extenders.map(extender =>
    {
        return <ValueProvider> {
            provide: ANGLR_EXCEPTION_EXTENDERS,
            useValue: extender,
            multi: true,
        };
    }));
}

/**
 * Provides internal server error renderer type
 * @param renderer - Type of renderer service
 */
export function provideInternalServerErrorRenderer(renderer: Type<InternalServerErrorRenderer>): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        <ClassProvider>
        {
            provide: INTERNAL_SERVER_ERROR_RENDERER,
            useClass: renderer,
        }
    ]);
}

/**
 * Provides http client error configs and merges them with existing provided configs
 * @param configs - Object storing configs to be provided
 */
export function provideHttpClientErrorConfigs(configs: HttpClientErrorConfigs): Provider
{
    return <FactoryProvider> {
        provide: HTTP_CLIENT_ERROR_CONFIGS,
        useFactory: () =>
        {
            const existingConfigs = inject(HTTP_CLIENT_ERROR_CONFIGS, {skipSelf: true, optional: true});

            return extend({}, existingConfigs, configs);
        },
    };
}

/**
 * Provides http client error handlers and merges them with existing provided handlers
 * @param handlers - Object storing handlers to be provided
 */
export function provideHttpClientErrorHandlers(handlers: HttpClientErrorHandlers): Provider
{
    return <FactoryProvider> {
        provide: HTTP_CLIENT_ERROR_HANDLERS,
        useFactory: () =>
        {
            const existingHandlers = inject(HTTP_CLIENT_ERROR_HANDLERS, {skipSelf: true, optional: true});

            return extend({}, existingHandlers, handlers);
        },
    };
}

/**
 * Provides http client error response mapper function
 * @param mapper - Mapper function to be provided
 */
export function provideHttpClientErrorResponseMapper(mapper: HttpClientErrorResponseMapper): Provider
{
    return <ValueProvider> {
        provide: HTTP_CLIENT_ERROR_RESPONSE_MAPPER,
        useValue: mapper,
    };
}

/**
 * Provides http client validation error response mapper function
 * @param mapper - Mapper function to be provided
 */
export function provideHttpClientValidationErrorResponseMapper(mapper: HttpClientValidationErrorResponseMapper): Provider
{
    return <ValueProvider> {
        provide: HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER,
        useValue: mapper,
    };
}
