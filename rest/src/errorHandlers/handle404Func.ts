import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import {RestNotFoundError} from '../types';

/**
 * Handles http error response with code 404 and returns RestNotFoundError
 * @param error - Http error response to be handled
 */
export function handle404Func(error: HttpErrorResponse): Observable<RestNotFoundError|HttpErrorResponse>
{
    if(error.status == 404)
    {
        return of(new RestNotFoundError(null));
    }

    return throwError(error);
}
