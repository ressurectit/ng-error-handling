import {HttpErrorResponse} from '@angular/common/http';
import {MonoTypeOperatorFunction, catchError} from 'rxjs';

import {handle404Func} from '../errorHandlers';
import {Handle4xxOptions} from '../misc/httpError.interface';
import {RestNotFoundError} from '../misc/httpErrors';

/**
 * Handles 404 http code as response
 * @param options - Options containing injector and mapper function for extraction of error messages
 */
export function handle404(options?: Handle4xxOptions): MonoTypeOperatorFunction<RestNotFoundError|HttpErrorResponse>
{
    return source =>
    {
        return source.pipe(catchError(err => handle404Func(err, options)));
    };
}
