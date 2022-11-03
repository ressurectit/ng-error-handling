import {handle400WithValidationsFunc, HttpClientErrorCustomHandler} from '@anglr/error-handling';
import {RESTClient, RestMethodMiddlewares} from '@anglr/rest';
import {isBlank} from '@jscrpt/common';

import {RestHttpClientErrors} from '../misc/restHttpError.interface';
import {WithRestClientContext} from '../misc/withRestClientContext';

/**
 * Handles 400 http code with validations
 * @param handler - Custom handler for 400 http status code, if not specified default one returning ClientValidationError will be used
 */
export function Handle400WithValidations(handler?: HttpClientErrorCustomHandler|WithRestClientContext<HttpClientErrorCustomHandler>)
{
    return function<TDecorated>(_target: RESTClient, _propertyKey: string, descriptor: RestHttpClientErrors &
                                                                                       RestMethodMiddlewares |
                                                                                       TDecorated): TypedPropertyDescriptor<any>
    {
        const descr = descriptor as RestHttpClientErrors & RestMethodMiddlewares;

        if(isBlank(handler))
        {
            handler = new WithRestClientContext(function(this: RESTClient)
            {
                return <HttpClientErrorCustomHandler>(err =>
                {
                    return handle400WithValidationsFunc(err, {injector: this.injector});
                });
            });
        }

        descr.customErrorHandlers ??= {};
        descr.customErrorHandlers[400] = handler;

        return descr;
    };
}