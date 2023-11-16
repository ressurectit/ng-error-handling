import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';

import {ClientErrorHandlingBehavior} from '../misc/clientErrorHandling.options';
import {RestHttpClientErrors} from '../misc/restHttpError.interface';

/**
 * Changes behavior of ClientErrorHandlingMiddleware to rest client error
 */
export function WithRestClientError()
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestHttpClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TDecorated
    {
        const descr = descriptor as RestHttpClientErrors & RestMethodMiddlewares;
        descr.behavior = ClientErrorHandlingBehavior.RestClientError;

        return descr as TDecorated;
    };
}