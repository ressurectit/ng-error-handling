import {isPresent} from '@jscrpt/common';

/**
 * Behavior for client error handling middleware
 */
export enum ClientErrorHandlingMiddlewareBehavior
{
    /**
     * Result of http request with client error is handled by middleware but observable never finishes
     */
    Suppress,

    /**
     * Result of http request with client error is handled by middleware and error passes through to observable
     */
    PassThrough,

    /**
     * Result of http request with client error is handled by middleware and observable returns instance of RestClientError or its descendants
     */
    RestClientError,
}

/**
 * Options for client error handling middleware
 */
export class ClientErrorHandlingMiddlewareOptions
{
    /**
     * Behavior of client error handling middleware
     */
    public behavior: ClientErrorHandlingMiddlewareBehavior = ClientErrorHandlingMiddlewareBehavior.Suppress;

    //######################### constructor #########################

    /**
     * Creates instance of ClientErrorHandlingMiddlewareOptions
     * @param behavior - Behavior of client error handling middleware
     **/
    constructor(behavior?: ClientErrorHandlingMiddlewareBehavior)
    {
        if(isPresent(behavior))
        {
            this.behavior = behavior;
        }
    }
}