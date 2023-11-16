import {HttpClientValidationErrors} from '../httpClientValidationErrors/httpClientValidationErrors.interface';

/**
 * Definition of http client errors read from http error response
 */
export interface HttpClientErrors
{
    /**
     * Array of error
     */
    errors: string[];

    /**
     * Object storing validation errors
     */
    validationErrors: HttpClientValidationErrors|null;
}
