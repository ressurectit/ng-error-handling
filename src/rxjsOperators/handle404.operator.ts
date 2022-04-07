import {HttpErrorResponse} from '@angular/common/http';
import {MonoTypeOperatorFunction} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {handle404Func} from '../errorHandlers';
import {RestNotFoundError} from '../misc/httpErrors';

/**
 * Handles 404 http code as response
 */
export function handle404(): MonoTypeOperatorFunction<RestNotFoundError|HttpErrorResponse>
{
    return source =>
    {
        return source.pipe(catchError(handle404Func));
    };
}
