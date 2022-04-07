import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';

import {RestClientErrors} from '../rest.interface';

/**
 * Adds ignored client error http codes for client error handling middleware
 * @param addIgnoredClientErrors - Array of ignored client error http codes that will be added
 */
export function IgnoreClientErrors(addIgnoredClientErrors: number[])
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TypedPropertyDescriptor<any>
    {
        const descr = descriptor as RestClientErrors & RestMethodMiddlewares;
        descr.addIgnoredClientErrors = addIgnoredClientErrors;

        return descr;
    };
}