import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';
import {handle404Func} from '@anglr/error-handling';
import {isBlank} from '@jscrpt/common';

import {RestHttpClientErrors} from '../misc/restHttpError.interface';
import {HttpClientErrorCustomHandlerDef} from '../misc/types';


/**
 * Handles 404 response http code
 * @param handler - Custom handler for 404 http status code, if not specified default one returning RestNotFoundError will be used
 */
export function Handle404(handler?: HttpClientErrorCustomHandlerDef)
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestHttpClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TypedPropertyDescriptor<any>
    {
        const descr = descriptor as RestHttpClientErrors & RestMethodMiddlewares;

        if(isBlank(handler))
        {
            handler = handle404Func;
        }

        descr.customErrorHandlers ??= {};
        descr.customErrorHandlers[404] = handler;

        return descr;
    };
}