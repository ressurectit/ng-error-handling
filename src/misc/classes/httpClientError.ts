import {HttpErrorResponse} from '@angular/common/http';

import {HttpClientValidationErrors} from '../../interfaces';

/**
 * Class that represents information about http client error (400..499)
 */
export class HttpClientError
{
    //######################### public properties #########################

    /**
     * Array of processed client errors
     */
    public readonly errors: string[];

    /**
     * Object storing server valiation errors
     */
    public readonly validationErrors: HttpClientValidationErrors|undefined|null;

    /**
     * Http status code
     */
    public get statusCode(): number
    {
        return this.response.status;
    }

    /**
     * Http error response message
     */
    public get message(): string
    {
        return this.response.message;
    }

    /**
     * Complete http error response object
     */
    public readonly response: HttpErrorResponse;

    //######################### constructor #########################
    constructor(errors: string[],
                validationErrors: HttpClientValidationErrors|undefined|null,
                response: HttpErrorResponse,)
    {
        this.errors = errors;
        this.validationErrors = validationErrors;
        this.response = response;
    }
}
