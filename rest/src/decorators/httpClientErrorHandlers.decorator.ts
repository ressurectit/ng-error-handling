import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';
import type {HttpClientErrorHandlers} from '@anglr/error-handling';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Sets http client error handlers
 * @param handlers - Http client error handlers for specific status codes
 */
export function HttpClientErrorHandlers(handlers: HttpClientErrorHandlers)
{
    return function<TDecorated>(_target: RESTClientBase, _propertyKey: string, descriptor: RestCatchHttpClientError &
                                                                                           RestMethodMiddlewares |
                                                                                           TDecorated): TDecorated
    {
        const descr = descriptor as RestCatchHttpClientError & RestMethodMiddlewares;

        descr.handlers = handlers;

        return descr as TDecorated;
    };
}
