import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import {Handle4xxOptions} from '../misc/httpError.interface';
import {RestNotFoundError} from '../misc/httpErrors';
import {readErrorsFromHttpErrorResponse} from '../misc/utils';

/**
 * Handles http error response with code 404 and returns RestNotFoundError
 * @param error - Http error response to be handled
 * @param options - Options containing injector and mapper function for extraction of error messages
 */
export function handle404Func(error: HttpErrorResponse,
                              options?: Handle4xxOptions): Observable<RestNotFoundError|HttpErrorResponse>
{
    return ɵHandle404Func(error,
                          options,
                          error => throwError(() => error),
                          errors => of(new RestNotFoundError(errors)));
}

/**
 * Handles http error response with code 404 with custom return types
 */
export function ɵHandle404Func<TError, TClientError>(error: HttpErrorResponse,
                                                     options: Handle4xxOptions|undefined|null,
                                                     errorReturnCallback: (error: HttpErrorResponse) => TError,
                                                     clientErrorReturnCallback: (errors: string[]) => TClientError): TError|TClientError
{
    if(error.status == 404)
    {
        let errors: string[] = [];

        if(options?.clientErrorsResponseMapper || options?.injector)
        {
            errors = readErrorsFromHttpErrorResponse(error, options.injector, options.clientErrorsResponseMapper).errors ?? [];
        }

        return clientErrorReturnCallback(errors);
    }

    return errorReturnCallback(error);
}
