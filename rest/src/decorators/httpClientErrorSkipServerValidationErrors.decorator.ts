import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';
import {isPresent} from '@jscrpt/common';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Sets http client error to skip server validation errors
 * @param indication - Indication whether skip server validation errors, defaults to true
 * @param statusCode - If specified, skip server validation errors will be set for specific http status code
 */
export function HttpClientErrorSkipServerValidationErrors(indication: boolean = true, statusCode?: number)
{
    return function<TDecorated>(_target: RESTClientBase, _propertyKey: string, descriptor: RestCatchHttpClientError &
                                                                                           RestMethodMiddlewares |
                                                                                           TDecorated): TDecorated
    {
        const descr = descriptor as RestCatchHttpClientError & RestMethodMiddlewares;

        if(isPresent(statusCode))
        {
            descr.configs ??= {};
            descr.configs[statusCode] ??= {};
            descr.configs[statusCode].skipServerValidationErrors = indication;
        }
        else
        {
            descr.skipServerValidationErrors = indication;
        }

        return descr as TDecorated;
    };
}
