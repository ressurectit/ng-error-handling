import {RESTClient} from '@anglr/rest';

/**
 * Allows resolving your data with RESTClient context
 */
export class WithRestClientContext<TResult>
{
    //######################### constructor #########################
    constructor(protected _withContext: (this: RESTClient) => TResult)
    {
    }

    //######################### public methods #########################

    /**
     * Resolves your callback with RESTClient context
     * @param restClient - Instance of rest client
     */
    public resolve(restClient: RESTClient): TResult
    {
        return this._withContext.call(restClient);
    }
}

/**
 * Resolves with rest client context into result
 * @param input - Input to be resolved
 * @param restClient - Instance of rest client
 */
export function resolveWithRestClientContext<TResult>(input: TResult|WithRestClientContext<TResult>, restClient: RESTClient): TResult
{
    if(input instanceof WithRestClientContext)
    {
        return input.resolve(restClient);
    }

    return input;
}