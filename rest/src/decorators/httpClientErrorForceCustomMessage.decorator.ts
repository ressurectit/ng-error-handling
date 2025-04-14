import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';
import {isPresent} from '@jscrpt/common';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Sets http client error to force custom message displaying
 * @param indication - Indication whether force custom message displaying, defaults to true
 * @param statusCode - If specified, force custom message display will be set for specific http status code
 */
export function HttpClientErrorForceCustomMessage(indication: boolean = true, statusCode?: number)
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
            descr.configs[statusCode].forceCustomMessageDisplay = indication;
        }
        else
        {
            descr.forceCustomMessageDisplay = indication;
        }

        return descr as TDecorated;
    };
}
