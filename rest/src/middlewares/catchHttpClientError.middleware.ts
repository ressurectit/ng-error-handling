import {HttpRequest} from '@angular/common/http';
import {RESTClientBase, RestMiddleware} from '@anglr/rest';
import {catchHttpClientError} from '@anglr/error-handling';
import {Observable} from 'rxjs';

import {RestCatchHttpClientError} from '../interfaces';

/**
 * Middleware that catches http client error and handles according options
 */
export class CatchHttpClientErrorMiddleware implements RestMiddleware<unknown, unknown, RestCatchHttpClientError>
{
    //######################### public static properties #########################

    /**
     * String identification of middleware
     */
    public static id: string = 'CatchHttpClientErrorMiddleware';

    //######################### public methods - implementation of RestMiddleware #########################

    /**
     * Runs code that is defined for this rest middleware, in this method you can modify request and response
     * @param this - Method is bound to RESTClient
     * @param id - Unique id that identifies request method
     * @param target - Prototype of class that are decorators applied to
     * @param methodName - Name of method that is being modified
     * @param descriptor - Descriptor of method that is being modified
     * @param args - Array of arguments passed to called method
     * @param request - Http request that you can modify
     * @param next - Used for calling next middleware with modified request
     */
    public run(this: RESTClientBase,
               _id: string,
               _target: unknown,
               _methodName: string,
               descriptor: RestCatchHttpClientError,
               _args: unknown[],
               request: HttpRequest<unknown>,
               next: (request: HttpRequest<unknown>) => Observable<unknown>): Observable<unknown>
    {
        return next(request)
            .pipe(catchHttpClientError(
            {
                injector: this.injector,
                behavior: descriptor.behavior,
                forceCustomMessageDisplay: descriptor.forceCustomMessageDisplay,
                handlers: descriptor.handlers,
                messages: descriptor.messages,
                skipErrorNotifications: descriptor.skipErrorNotifications,
                skipServerValidationErrors: descriptor.skipServerValidationErrors,
            }));
    }
}