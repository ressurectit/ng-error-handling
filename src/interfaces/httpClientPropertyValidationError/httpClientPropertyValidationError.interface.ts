/**
 * Validation errors for single validated property
 */
export interface HttpClientPropertyValidationError
{
    /**
     * Name or type of error and its text
     */
    [error: string]: string;
}
