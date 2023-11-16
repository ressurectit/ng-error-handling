import {ClassProvider, EnvironmentProviders, Type, ValueProvider, makeEnvironmentProviders} from '@angular/core';

import {AnglrExceptionExtender} from '../exceptionHandling/anglrExceptionExtender';
import {ANGLR_EXCEPTION_EXTENDERS, INTERNAL_SERVER_ERROR_RENDERER} from './tokens';
import {InternalServerErrorRenderer} from '../internalServerError/internalServerError.service';

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
