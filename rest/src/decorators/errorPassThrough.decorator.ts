import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';

import {ClientErrorHandlingBehavior} from '../misc/clientErrorHandling.options';
import {RestHttpClientErrors} from '../misc/restHttpError.interface';

/**
 * Changes behavior of ClientErrorHandlingMiddleware to pass through errors
 */
export function ErrorPassThrough()
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestHttpClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TDecorated
    {
        const descr = descriptor as RestHttpClientErrors & RestMethodMiddlewares;
        descr.behavior = ClientErrorHandlingBehavior.PassThrough;

        return descr as TDecorated;
    };
}