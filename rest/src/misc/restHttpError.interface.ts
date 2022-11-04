import {HttpClientErrorResponseMapper} from '@anglr/error-handling';

import {ClientErrorHandlingOptions} from './clientErrorHandling.options';
import {HttpClientErrorCustomHandlerDef} from './types';


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
    customErrorHandlers?: Record<number, HttpClientErrorCustomHandlerDef>;
}
