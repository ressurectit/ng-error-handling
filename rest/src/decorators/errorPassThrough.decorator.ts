import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';

import {RestHttpClientErrors} from '../misc/restHttpError.interface';
import {ClientErrorHandlingMiddlewareBehavior} from '../misc/clientErrorHandlingMiddleware.options';

/**
 * Changes behavior of ClientErrorHandlingMiddleware to pass through errors
 */
export function ErrorPassThrough()
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestHttpClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TypedPropertyDescriptor<any>
    {
        const descr = descriptor as RestHttpClientErrors & RestMethodMiddlewares;
        descr.behavior = ClientErrorHandlingMiddlewareBehavior.PassThrough;

        return descr;
    };
}