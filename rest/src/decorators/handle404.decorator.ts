import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';
import {isBlank} from '@jscrpt/common';

import {handle404Func} from '../errorHandlers/handle404Func';
import {RestClientErrorCustomHandler, RestClientErrors} from '../rest.interface';

/**
 * Handles 404 response http code
 * @param handler - Custom handler for 404 http status code, if not specified default one returning RestNotFoundError will be used
 */
export function Handle404(handler?: RestClientErrorCustomHandler)
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TypedPropertyDescriptor<any>
    {
        const descr = descriptor as RestClientErrors & RestMethodMiddlewares;

        if(isBlank(handler))
        {
            handler = handle404Func;
        }

        descr.customErrorHandlers ??= {};
        descr.customErrorHandlers[404] = handler;

        return descr;
    };
}