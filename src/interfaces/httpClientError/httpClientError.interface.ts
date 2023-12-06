import {HttpErrorResponse} from '@angular/common/http';

import {HttpClientErrors} from '../httpClientErrors/httpClientErrors.interface';

/**
 * Http client error, containing extracted errors and original
 */
export interface XXXHttpClientError extends HttpClientErrors
{
    /**
     * Original http error response
     */
    httpResponse: HttpErrorResponse;
}
