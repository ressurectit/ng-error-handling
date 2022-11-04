import {ClientValidationError, handle400WithValidationsFunc, HttpClientError, HttpClientErrorCustomHandler, RestClientError} from '@anglr/error-handling';
import {Func1, isPresent} from '@jscrpt/common';
import {NEVER, Observable, of, throwError} from 'rxjs';

/**
 * Behavior for client error handling
 */
export enum ClientErrorHandlingBehavior
{
    /**
     * Result of http request with client error is handled by handler but observable never finishes
     */
    Suppress,

    /**
     * Result of http request with client error is handled by handler and extracted errors passes through to observable
     */
    PassThrough,

    /**
     * Result of http request with client error is handled by handler and extracted errors passes through to observable with original http error
     */
    PassThroughHttp,

    /**
     * Result of http request with client error is handled by handler and observable returns instance of RestClientError or its descendants
     */
    RestClientError,
}

/**
 * Options for client error handling
 */
export class ClientErrorHandlingOptions
{
    /**
     * Behavior of client error handling
     */
    public behavior: ClientErrorHandlingBehavior = ClientErrorHandlingBehavior.Suppress;

    /**
     * Default error handler to be used if no other configured handler was found
     */
    public defaultHandler: HttpClientErrorCustomHandler = handle400WithValidationsFunc;

    /**
     * Default factory for obtaining RestClientError
     */
    public defaultClientError: Func1<RestClientError, HttpClientError> = error => new RestClientError(error.errors);

    /**
     * Default factory for obtaining ClientValidationError
     */
    public defaultClientValidationError: Func1<ClientValidationError, HttpClientError> = error => new ClientValidationError(error.errors, error.validationErrors);

    //######################### constructor #########################

    /**
     * Creates instance of ClientErrorHandlingOptions
     * @param behavior - Behavior of client error handling
     * @param defaultHandler - Default error handler to be used if no other configured handler was found
     * @param defaultClientError - Default factory for obtaining RestClientError
     * @param defaultClientValidationError - Default factory for obtaining ClientValidationError
     **/
    constructor(behavior?: ClientErrorHandlingBehavior,
                defaultHandler?: HttpClientErrorCustomHandler,
                defaultClientError?: Func1<RestClientError, HttpClientError>,
                defaultClientValidationError?: Func1<ClientValidationError, HttpClientError>,)
    {
        if(isPresent(behavior))
        {
            this.behavior = behavior;
        }

        if(isPresent(defaultHandler))
        {
            this.defaultHandler = defaultHandler;
        }

        if(isPresent(defaultClientError))
        {
            this.defaultClientError = defaultClientError;
        }

        if(isPresent(defaultClientValidationError))
        {
            this.defaultClientValidationError = defaultClientValidationError;
        }
    }
}

/**
 * Gets observable for error according specified behavior
 * @param error - Information about occured error
 * @param restClientErrorCallback - Callback used for obtaining instance of RestClientError
 * @param behavior - Behaviour which should be used
 */
export function getDefaultClientErrorObservable(error: HttpClientError, restClientErrorCallback: Func1<RestClientError, HttpClientError>, behavior?: ClientErrorHandlingBehavior): Observable<never|RestClientError>
{
    if(!behavior)
    {
        behavior = new ClientErrorHandlingOptions().behavior;
    }

    switch(behavior)
    {
        default:
        //case ClientErrorHandlingBehavior.Suppress:
        {
            return NEVER;
        }
        case ClientErrorHandlingBehavior.PassThrough:
        {
            return throwError(() => error.errors);
        }
        case ClientErrorHandlingBehavior.PassThroughHttp:
        {
            return throwError(() => error);
        }
        case ClientErrorHandlingBehavior.RestClientError:
        {
            return of(restClientErrorCallback(error));
        }
    }
}