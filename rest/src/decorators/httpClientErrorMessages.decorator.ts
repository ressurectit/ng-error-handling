import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';
import type {HttpClientErrorMessages} from '@anglr/error-handling';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Sets http client error messages
 * @param messages - Http client error messages for specific status codes
 */
export function HttpClientErrorMessages(messages: HttpClientErrorMessages)
{
    return function<TDecorated>(_target: RESTClientBase, _propertyKey: string, descriptor: RestCatchHttpClientError &
                                                                                           RestMethodMiddlewares |
                                                                                           TDecorated): TDecorated
    {
        const descr = descriptor as RestCatchHttpClientError & RestMethodMiddlewares;

        for(const statusCode in messages)
        {
            const message = messages[statusCode];

            descr.configs ??= {};
            descr.configs[statusCode] ??= {};
            descr.configs[statusCode].message = message;
        }

        return descr as TDecorated;
    };
}
