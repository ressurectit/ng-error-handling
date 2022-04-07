import {HttpErrorResponse} from '@angular/common/http';
import {MonoTypeOperatorFunction} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {RestClientError, ClientValidationError} from '../types';
import {Handle400WithValidationsOptions} from '../rest.interface';
import {handle400WithValidationsFunc} from '../errorHandlers';

/**
 * Handles 400 http code with validations as response
 * @param options - Options that are required for handling 400 with validations
 */
export function handle400WithValidations(options: Handle400WithValidationsOptions): MonoTypeOperatorFunction<RestClientError|ClientValidationError|HttpErrorResponse>
{
    return source =>
    {
        return source.pipe(catchError(err => handle400WithValidationsFunc(err, options)));
    };
}
