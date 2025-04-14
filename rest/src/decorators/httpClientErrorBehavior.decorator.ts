import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';
import type {CatchHttpClientErrorBehavior} from '@anglr/error-handling';
import {isPresent} from '@jscrpt/common';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Sets http client error behavior
 * @param behavior - Behavior to be used
 * @param statusCode - If specified, behavior will be set for specific http status code
 */
export function HttpClientErrorBehavior(behavior: CatchHttpClientErrorBehavior, statusCode?: number)
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
            descr.configs[statusCode].behavior = behavior;
        }
        else
        {
            descr.behavior = behavior;
        }

        return descr as TDecorated;
    };
}
