import {HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {LOGGER, Logger} from '@anglr/common';
import {RESTClientBase, RestMiddleware} from '@anglr/rest';
import {Observable, throwError, catchError} from 'rxjs';

import {RestHttpClientErrors} from '../misc/restHttpError.interface';
import {CLIENT_ERROR_HANDLING_MIDDLEWARE_OPTIONS, HTTP_CLIENT_ERROR_CUSTOM_HANDLER, HTTP_IGNORED_CLIENT_ERRORS} from '../misc/tokens';
import {ClientErrorHandlingOptions, getDefaultClientErrorObservable} from '../misc/clientErrorHandling.options';
import {getErrorHandlers} from '../misc/utils';

interface ɵClientError
{
    ɵLogger: Logger|null;

    ɵClientErrorHandlingMiddlewareOptions: ClientErrorHandlingOptions;
}

/**
 * Middleware that is used for handling 4xx errors 
 */
export class ClientErrorHandlingMiddleware implements RestMiddleware<unknown, unknown, RestHttpClientErrors>
{
    //######################### public static properties #########################

    /**
     * String identification of middleware
     */
    public static id: string = 'ClientErrorHandlingMiddleware';

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
               descriptor: RestHttpClientErrors,
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
                    return throwError(() => err);
                }

                //client error, not response from server
                if (err.error instanceof Error)
                {
                    return throwError(() => err);
                }

                //if client error
                if(err.status >= 400 && err.status < 500)
                {
                    const $this = this as unknown as ɵClientError;
                    const ignoredClientErrors = this.injector.get(HTTP_IGNORED_CLIENT_ERRORS).concat(descriptor?.addIgnoredClientErrors ?? []);

                    $this.ɵLogger ??= this.injector.get(LOGGER, null);
                    $this.ɵClientErrorHandlingMiddlewareOptions ??= this.injector.get(CLIENT_ERROR_HANDLING_MIDDLEWARE_OPTIONS, new ClientErrorHandlingOptions());
                    $this.ɵLogger?.error('HTTP_ERROR {{status}} {{statusText}}: {{@error}}', {status: err.status, statusText: err.statusText, error: err.error});
                    
                    //client error ignored
                    if(ignoredClientErrors.find(itm => itm == err.status))
                    {
                        return throwError(() => err);
                    }
                    
                    const customErrorHandlers = 
                    {
                        ...this.injector.get(HTTP_CLIENT_ERROR_CUSTOM_HANDLER, null),
                        ...descriptor?.customErrorHandlers,
                    };

                    const behavior = descriptor.behavior ?? $this.ɵClientErrorHandlingMiddlewareOptions.behavior;

                    //call custom error handler
                    if(customErrorHandlers?.[err.status])
                    {
                        const {clientErrorFn, clientValidationErrorFn, handlerFn} = getErrorHandlers($this.ɵClientErrorHandlingMiddlewareOptions, descriptor, customErrorHandlers?.[err.status]);

                        return handlerFn(err,
                                         {injector: this.injector, clientErrorsResponseMapper: descriptor.clientErrorResponseMapper},
                                         error => throwError(() => error),
                                         error => getDefaultClientErrorObservable(error, e => clientErrorFn(e), behavior),
                                         error => getDefaultClientErrorObservable(error, e => clientValidationErrorFn(e), behavior)) as Observable<unknown>;
                    }

                    const {clientErrorFn, clientValidationErrorFn, handlerFn} = getErrorHandlers($this.ɵClientErrorHandlingMiddlewareOptions, descriptor);
                    
                    return handlerFn(err,
                                     {injector: this.injector, clientErrorsResponseMapper: descriptor.clientErrorResponseMapper},
                                     error => throwError(() => error),
                                     error => getDefaultClientErrorObservable(error, e => clientErrorFn(e), behavior),
                                     error => getDefaultClientErrorObservable(error, e => clientValidationErrorFn(e), behavior)) as Observable<unknown>;
                }

                return throwError(() => err);
            }));
    }
}