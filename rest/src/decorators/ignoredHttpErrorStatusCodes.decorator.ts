import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';

import {RestHttpClientErrorProcessing} from '../interfaces';

/**
 * Sets ignored http error status codes that will be ignored by catch http client error middleware
 * @param statusCodes - Ignored http status codes for this method
 */
export function IgnoredHttpErrorStatusCodes(statusCodes: number[])
{
    return function<TDecorated>(_target: RESTClientBase, _propertyKey: string, descriptor: RestHttpClientErrorProcessing &
                                                                                           RestMethodMiddlewares |
                                                                                           TDecorated): TDecorated
    {
        const descr = descriptor as RestHttpClientErrorProcessing & RestMethodMiddlewares;

        descr.ignoredHttpStatusCodes = statusCodes;

        return descr as TDecorated;
    };
}