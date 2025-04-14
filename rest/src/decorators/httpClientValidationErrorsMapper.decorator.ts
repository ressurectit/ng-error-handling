import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';
import {HttpClientValidationErrorResponseMapper} from '@anglr/error-handling';

import {RestHttpClientErrorProcessing} from '../interfaces';

/**
 * Sets custom http client validation errors mapper function
 * @param mapperFunction - Mapper function that will be assigned
 */
export function HttpClientValidationErrorsMapper(mapperFunction: HttpClientValidationErrorResponseMapper)
{
    return function<TDecorated>(_target: RESTClientBase, _propertyKey: string, descriptor: RestHttpClientErrorProcessing &
                                                                                           RestMethodMiddlewares |
                                                                                           TDecorated): TDecorated
    {
        const descr = descriptor as RestHttpClientErrorProcessing & RestMethodMiddlewares;

        descr.clientValidationErrorsResponseMapper = mapperFunction;

        return descr as TDecorated;
    };
}
