import {ClientValidationError, HttpClientError, HttpClientErrorCustomHandler, RestClientError} from '@anglr/error-handling';
import {Func1} from '@jscrpt/common';

import {ClientErrorHandlingOptions} from './clientErrorHandling.options';
import {HttpClientErrorCustomHandlerDef} from './types';

/**
 * Gets error handler functions to be used for handling errors
 * @param defaultOptions - Default options
 * @param options - Default options overrides
 * @param handler - Handler definition
 */
export function getErrorHandlers(defaultOptions: ClientErrorHandlingOptions,
                                 options: Partial<ClientErrorHandlingOptions>,
                                 handler?: HttpClientErrorCustomHandlerDef,): {handlerFn: HttpClientErrorCustomHandler, clientErrorFn: Func1<RestClientError, HttpClientError>, clientValidationErrorFn: Func1<ClientValidationError, HttpClientError>}
{
    const opts =
    {
        ...defaultOptions,
        ...options,
    };

    let handlerFn = opts.defaultHandler;
    let clientErrorFn = opts.defaultClientError;
    let clientValidationErrorFn = opts.defaultClientValidationError;

    if(handler)
    {
        if(Array.isArray(handler))
        {
            [handlerFn, clientErrorFn] = handler;
            const [, , validationErrorFn] = handler;

            if(validationErrorFn)
            {
                clientValidationErrorFn = validationErrorFn;
            }
        }
        else
        {
            handlerFn = handler;
        }
    }

    return {
        handlerFn,
        clientErrorFn,
        clientValidationErrorFn,
    };
}