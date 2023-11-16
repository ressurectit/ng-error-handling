import {HttpClientPropertyValidationError} from '../httpClientPropertyValidationError/httpClientPropertyValidationError.interface';

/**
 * Object storing validations errors from server
 */
export interface HttpClientValidationErrors
{
    /**
     * Name of property and its validation errors
     */
    [property: string]: HttpClientPropertyValidationError;
}
