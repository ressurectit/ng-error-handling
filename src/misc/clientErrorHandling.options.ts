import {Func1, isPresent} from '@jscrpt/common';
import {NEVER, Observable, of, throwError} from 'rxjs';

import {HttpClientError} from './httpError.interface';
import {RestClientError} from './httpErrors';

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

    //######################### constructor #########################

    /**
     * Creates instance of ClientErrorHandlingOptions
     * @param behavior - Behavior of client error handling
     **/
    constructor(behavior?: ClientErrorHandlingBehavior)
    {
        if(isPresent(behavior))
        {
            this.behavior = behavior;
        }
    }
}

/**
 * Gets observable for error according specified behavior
 * @param error - Information about occured error
 * @param restClientErrorCallback - Callback used for obtaining instance of RestClientError
 * @param behavior - Behaviour which should be used
 * @returns 
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