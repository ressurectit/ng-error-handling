import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Sets http client error to skip error notifications
 * @param indication - Indication whether skip error notifications, defaults to true
 */
export function HttpClientErrorSkipErrorNotifications(indication: boolean = true)
{
    return function<TDecorated>(_target: RESTClientBase, _propertyKey: string, descriptor: RestCatchHttpClientError &
                                                                                           RestMethodMiddlewares |
                                                                                           TDecorated): TDecorated
    {
        const descr = descriptor as RestCatchHttpClientError & RestMethodMiddlewares;

        descr.skipErrorNotifications = indication;

        return descr as TDecorated;
    };
}