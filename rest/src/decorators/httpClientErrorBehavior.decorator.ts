import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';
import type {CatchHttpClientErrorBehavior} from '@anglr/error-handling';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Sets http client error behavior
 * @param behavior - Behavior to be used
 */
export function HttpClientErrorBehavior(behavior: CatchHttpClientErrorBehavior)
{
    return function<TDecorated>(_target: RESTClientBase, _propertyKey: string, descriptor: RestCatchHttpClientError &
                                                                                           RestMethodMiddlewares |
                                                                                           TDecorated): TDecorated
    {
        const descr = descriptor as RestCatchHttpClientError & RestMethodMiddlewares;

        descr.behavior = behavior;

        return descr as TDecorated;
    };
}
