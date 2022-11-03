import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';
import {ClientErrorHandlingBehavior} from '@anglr/error-handling';

import {RestHttpClientErrors} from '../misc/restHttpError.interface';

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
        descr.behavior = ClientErrorHandlingBehavior.PassThrough;

        return descr;
    };
}