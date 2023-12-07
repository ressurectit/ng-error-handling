/**
 * Enumeration of available behavior for catch http client error
 */
export enum CatchHttpClientErrorBehavior
{
    /**
     * Error is processed, but observable never completes
     */
    Suppress,

    /**
     * HttpClientError object is returned as result of observable
     */
    PassThrogh,

    /**
     * HttpClientError object is 'thrown' as error from observable
     */
    Throw,
}