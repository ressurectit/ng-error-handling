import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';

import {RestHttpClientErrors} from '../misc/restHttpError.interface';

/**
 * Adds ignored client error http codes for client error handling middleware
 * @param addIgnoredClientErrors - Array of ignored client error http codes that will be added
 */
export function IgnoreClientErrors(addIgnoredClientErrors: number[])
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestHttpClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TDecorated
    {
        const descr = descriptor as RestHttpClientErrors & RestMethodMiddlewares;
        descr.addIgnoredClientErrors = addIgnoredClientErrors;

        return descr as TDecorated;
    };
}