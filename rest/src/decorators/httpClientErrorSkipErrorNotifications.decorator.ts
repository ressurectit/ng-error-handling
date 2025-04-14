import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';
import {isPresent} from '@jscrpt/common';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Sets http client error to skip error notifications
 * @param indication - Indication whether skip error notifications, defaults to true
 * @param statusCode - If specified, skip error notifications will be set for specific http status code
 */
export function HttpClientErrorSkipErrorNotifications(indication: boolean = true, statusCode?: number)
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
            descr.configs[statusCode].skipErrorNotifications = indication;
        }
        else
        {
            descr.skipErrorNotifications = indication;
        }

        return descr as TDecorated;
    };
}
