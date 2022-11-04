import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';

import {ClientErrorHandlingBehavior} from '../misc/clientErrorHandling.options';
import {RestHttpClientErrors} from '../misc/restHttpError.interface';

/**
 * Changes behavior of ClientErrorHandlingMiddleware to pass through errors and http error response
 */
export function ErrorPassThroughHttp()
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestHttpClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TypedPropertyDescriptor<any>
    {
        const descr = descriptor as RestHttpClientErrors & RestMethodMiddlewares;
        descr.behavior = ClientErrorHandlingBehavior.PassThroughHttp;

        return descr;
    };
}