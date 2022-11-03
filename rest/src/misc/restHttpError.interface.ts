import {ClientErrorHandlingOptions, HttpClientErrorCustomHandler, HttpClientErrorResponseMapper} from '@anglr/error-handling';

import {WithRestClientContext} from './withRestClientContext';

/**
 * Contains metadata for http client errors configuration
 */
export interface RestHttpClientErrors extends TypedPropertyDescriptor<any>, Partial<ClientErrorHandlingOptions>
{
    /**
     * Array of ignored client errors that will be added to default ones
     */
    addIgnoredClientErrors?: number[];

    /**
     * Response mapper for client errors
     */
    clientErrorResponseMapper?: HttpClientErrorResponseMapper;

    /**
     * Custom error handlers for specific http status codes
     */
    customErrorHandlers?: Record<number, HttpClientErrorCustomHandler|WithRestClientContext<HttpClientErrorCustomHandler>>;
}
