import type {RESTClientBase, RestMethodMiddlewares} from '@anglr/rest';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Sets http client error to force custom message displaying
 * @param indication - Indication whether force custom message displaying, defaults to true
 */
export function HttpClientErrorForceCustomMessage(indication: boolean = true)
{
    return function<TDecorated>(_target: RESTClientBase, _propertyKey: string, descriptor: RestCatchHttpClientError &
                                                                                           RestMethodMiddlewares |
                                                                                           TDecorated): TDecorated
    {
        const descr = descriptor as RestCatchHttpClientError & RestMethodMiddlewares;

        descr.forceCustomMessageDisplay = indication;

        return descr as TDecorated;
    };
}