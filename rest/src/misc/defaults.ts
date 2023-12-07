import {ValueProvider} from '@angular/core';
import {RestMiddlewareOrderType, REST_MIDDLEWARES_ORDER} from '@anglr/rest';
import type {middlewareTypes as restMiddlewareTypes} from '@anglr/rest';

import type {middlewareTypes} from './middlewareTypes';

/**
 * Definition of array of rest middlewares order including error handling middleware
 */
export const ERROR_HANDLING_REST_MIDDLEWARES_ORDER: RestMiddlewareOrderType<middlewareTypes|restMiddlewareTypes>[] =
[
    'BodyParameterMiddleware',
    'PathParameterMiddleware',
    'QueryObjectParameterMiddleware',
    'QueryParameterMiddleware',
    'HeadersMiddleware',
    'HeaderParameterMiddleware',
    'HttpClientErrorProcessingMiddleware',
    'ProducesMiddleware',
    'LoggerMiddleware',
    'IgnoredInterceptorsMiddleware',
    'ProgressIndicatorGroupMiddleware',
    'ResponseTransformMiddleware',
    'ResponseTypeMiddleware',
    'CacheMiddleware',
    'ClearAdvancedCacheMiddleware',
    'AdvancedCacheMiddleware',
    'MockLoggerMiddleware',
    'ReportProgressMiddleware',
];

/**
 * Provider for rest middleware order with error handling middleware
 */
export const REST_ERROR_HANDLING_MIDDLEWARE_ORDER: ValueProvider =
{
    provide: REST_MIDDLEWARES_ORDER,
    useValue: ERROR_HANDLING_REST_MIDDLEWARES_ORDER
};