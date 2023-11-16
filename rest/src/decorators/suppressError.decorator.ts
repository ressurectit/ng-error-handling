import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';

import {ClientErrorHandlingBehavior} from '../misc/clientErrorHandling.options';
import {RestHttpClientErrors} from '../misc/restHttpError.interface';

/**
 * Changes behavior of ClientErrorHandlingMiddleware to suppress errors
 */
export function SuppressError()
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestHttpClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TDecorated
    {
        const descr = descriptor as RestHttpClientErrors & RestMethodMiddlewares;
        descr.behavior = ClientErrorHandlingBehavior.Suppress;

        return descr as TDecorated;
    };
}