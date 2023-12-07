import {HttpClientErrorResponseMapper, HttpClientValidationErrorResponseMapper} from '@anglr/error-handling';

/**
 * Contains custom mapper functions
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
}
