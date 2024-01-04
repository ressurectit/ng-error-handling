import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Sets http client error to skip server validation errors
 * @param indication - Indication whether skip server validation errors, defaults to true
 */
export function HttpClientErrorSkipServerValidationErrors(indication: boolean = true)
{
    return function<TDecorated>(_target: RESTClientBase, _propertyKey: string, descriptor: RestCatchHttpClientError &
                                                                                           RestMethodMiddlewares |
                                                                                           TDecorated): TDecorated
    {
        const descr = descriptor as RestCatchHttpClientError & RestMethodMiddlewares;

        descr.skipServerValidationErrors = indication;

        return descr as TDecorated;
    };
}