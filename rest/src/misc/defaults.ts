import {RestMiddlewareOrderType} from '@anglr/rest';
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
    'ClientErrorHandlingMiddleware',
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
