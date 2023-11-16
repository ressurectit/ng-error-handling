import {MonoTypeOperatorFunction, catchError, throwError, of, NEVER} from 'rxjs';

import {handle4xxFunc} from '../errorHandlers/handle4xxFunc';
import {RestClientError} from '../misc/classes/restClientError';
import {Handle4xxOptions} from '../interfaces';

/**
 * Handles http error response with code 400..499 as response and returns RestClientError
 * @param options - Options that are required for handling 4xx http codes
 */
export function handle4xx(options: Handle4xxOptions): MonoTypeOperatorFunction<RestClientError>
{
    return source =>
    {
        return source.pipe(catchError(err => handle4xxFunc(err,
                                                           options,
                                                           error => throwError(() => error),
                                                           error => of(new RestClientError(error.errors)))));
    };
}

/**
 * Handles http error response with code 400..499 as response and never returns
 * @param options - Options that are required for handling 4xx http codes
 */
export function handle4xxSuppress(options: Handle4xxOptions): MonoTypeOperatorFunction<never>
{
    return source =>
    {
        return source.pipe(catchError(err => handle4xxFunc(err,
                                                           options,
                                                           error => throwError(() => error),
                                                           () => NEVER)));
    };
}
