import {HttpErrorResponse} from '@angular/common/http';
import {MonoTypeOperatorFunction} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {handle4xxFunc} from '../errorHandlers/handle4xxFunc';
import {Handle4xxOptions} from '../misc/httpError.interface';
import {ClientValidationError, RestClientError} from '../misc/httpErrors';

/**
 * Handles http error response with code 400..499 as response
 * @param options - Options that are required for handling 4xx http codes
 */
export function handle4xx(options: Handle4xxOptions): MonoTypeOperatorFunction<RestClientError|ClientValidationError|HttpErrorResponse>
{
    return source =>
    {
        return source.pipe(catchError(err => handle4xxFunc(err, options)));
    };
}
