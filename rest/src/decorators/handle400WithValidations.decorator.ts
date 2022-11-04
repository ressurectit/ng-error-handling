import {handle400WithValidationsFunc} from '@anglr/error-handling';
import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';
import {isBlank} from '@jscrpt/common';

import {RestHttpClientErrors} from '../misc/restHttpError.interface';
import {HttpClientErrorCustomHandlerDef} from '../misc/types';

/**
 * Handles 400 http code with validations
 * @param handler - Custom handler for 400 http status code, if not specified default one returning ClientValidationError will be used
 */
export function Handle400WithValidations(handler?: HttpClientErrorCustomHandlerDef)
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestHttpClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TypedPropertyDescriptor<any>
    {
        const descr = descriptor as RestHttpClientErrors & RestMethodMiddlewares;

        if(isBlank(handler))
        {
            handler = handle400WithValidationsFunc;
        }

        descr.customErrorHandlers ??= {};
        descr.customErrorHandlers[400] = handler;

        return descr;
    };
}