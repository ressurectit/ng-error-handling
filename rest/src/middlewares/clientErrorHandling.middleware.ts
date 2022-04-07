import {HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {LOGGER, Logger, Notifications} from '@anglr/common';
import {RESTClient, RestMiddleware} from '@anglr/rest';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {CLIENT_ERROR_NOTIFICATIONS, CUSTOM_CLIENT_ERROR_HANDLER, REST_CLIENT_ERRORS_RESPONSE_MAPPER, REST_IGNORED_CLIENT_ERRORS} from '../tokens';
import {RestClientErrors} from '../rest.interface';
import {RestClientError} from '../types';

interface ɵClientError
{
    ɵNotifications: Notifications|null;
    ɵLogger: Logger|null;
}

/**
 * Middleware that is used for handling 4xx errors 
 */
export class ClientErrorHandlingMiddleware implements RestMiddleware
{
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
    public run(this: RESTClient,
               _id: string,
               _target: unknown,
               _methodName: string,
               descriptor: RestClientErrors,
               _args: unknown[],
               request: HttpRequest<unknown>,
               next: (request: HttpRequest<unknown>) => Observable<unknown>): Observable<unknown>
    {
        return next(request)
            .pipe(catchError(err =>
            {
                //nothing to handle
                if (!(err instanceof HttpErrorResponse))
                {
                    return throwError(err);
                }

                //client error, not response from server
                if (err.error instanceof Error)
                {
                    return throwError(err);
                }

                //if client error
                if(err.status >= 400 && err.status < 500)
                {
                    const $this = this as unknown as ɵClientError;
                    const ignoredClientErrors = this.injector.get(REST_IGNORED_CLIENT_ERRORS).concat(descriptor?.addIgnoredClientErrors ?? []);

                    $this.ɵLogger ??= this.injector.get(LOGGER, null);
                    $this.ɵLogger?.error(`HTTP_ERROR ${err.status} ${err.statusText}: ${err.error}`);
                    
                    //client error ignored
                    if(ignoredClientErrors.find(itm => itm == err.status))
                    {
                        return throwError(err);
                    }
                    
                    const customErrorHandlers = descriptor?.customErrorHandlers ?? this.injector.get(CUSTOM_CLIENT_ERROR_HANDLER, null);

                    //call custom error handler
                    if(customErrorHandlers?.[err.status])
                    {
                        return customErrorHandlers[err.status](err);
                    }

                    $this.ɵNotifications ??= this.injector.get(CLIENT_ERROR_NOTIFICATIONS, null);

                    const mapper = descriptor?.clientErrorsResponseMapper ?? this.injector.get(REST_CLIENT_ERRORS_RESPONSE_MAPPER);
                    const errors = mapper(err);

                    errors?.forEach(error => $this.ɵNotifications?.error(error));

                    return of(new RestClientError(errors));
                }

                //other errors
                return throwError(err);
            }));
    }
}