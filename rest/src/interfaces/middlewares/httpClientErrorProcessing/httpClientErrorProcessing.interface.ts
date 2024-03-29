import {HttpClientErrorResponseMapper, HttpClientValidationErrorResponseMapper} from '@anglr/error-handling';

/**
 * Configuration that can be used within http client error processing middleware
 */
export interface RestHttpClientErrorProcessing extends TypedPropertyDescriptor<unknown>
{
    /**
     * Response mapper for http client errors
     */
    clientErrorsResponseMapper: HttpClientErrorResponseMapper|undefined|null;

    /**
     * Response mapper for http client validation errors
     */
    clientValidationErrorsResponseMapper: HttpClientValidationErrorResponseMapper|undefined|null;

    /**
     * Array of ignored http status codes that will not be processed
     */
    ignoredHttpStatusCodes: number[]|undefined|null;
}
