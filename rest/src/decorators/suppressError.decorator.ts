import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';

import {RestHttpClientErrors} from '../misc/restHttpError.interface';
import {ClientErrorHandlingMiddlewareBehavior} from '../misc/clientErrorHandlingMiddleware.options';

/**
 * Changes behavior of ClientErrorHandlingMiddleware to suppress errors
 */
export function SuppressError()
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestHttpClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TypedPropertyDescriptor<any>
    {
        const descr = descriptor as RestHttpClientErrors & RestMethodMiddlewares;
        descr.behavior = ClientErrorHandlingMiddlewareBehavior.Suppress;

        return descr;
    };
}