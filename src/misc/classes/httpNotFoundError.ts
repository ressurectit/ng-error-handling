import {HttpErrorResponse} from '@angular/common/http';

import {HttpClientValidationErrors} from '../../interfaces';
import {HttpClientError} from './httpClientError';

/**
 * Class that represents information about http not found error (404)
 */
export class HttpNotFoundError extends HttpClientError
{
    //######################### public properties #########################

    /**
     * Http status code
     */
    public override get statusCode(): 404
    {
        return 404;
    }

    //######################### constructor #########################
    constructor(errors: string[],
                validationErrors: HttpClientValidationErrors,
                response: HttpErrorResponse&{status: 404},)
    {
        super(errors, validationErrors, response);
    }
}