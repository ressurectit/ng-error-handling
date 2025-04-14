import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';
import {HttpClientErrorResponseMapper} from '@anglr/error-handling';

import {RestHttpClientErrorProcessing} from '../interfaces';

/**
 * Sets custom http client errors mapper function
 * @param mapperFunction - Mapper function that will be assigned
 */
export function HttpClientErrorsMapper(mapperFunction: HttpClientErrorResponseMapper)
{
    return function<TDecorated>(_target: RESTClientBase, _propertyKey: string, descriptor: RestHttpClientErrorProcessing &
                                                                                           RestMethodMiddlewares |
                                                                                           TDecorated): TDecorated
    {
        const descr = descriptor as RestHttpClientErrorProcessing & RestMethodMiddlewares;

        descr.clientErrorsResponseMapper = mapperFunction;

        return descr as TDecorated;
    };
}
