// import {MonoTypeOperatorFunction, catchError, of, throwError} from 'rxjs';

// import {handle400WithValidationsFunc} from '../errorHandlers';
// import {Handle4xxOptions} from '../interfaces';
// import {ClientValidationError} from '../misc/classes/clientValidationError';
// import {RestClientError} from '../misc/classes/restClientError';

// /**
//  * Handles 400 http code with validations as response and returns ClientValidationError or RestClientError if no validation errors
//  * @param options - Options that are required for handling 400 with validations
//  */
// export function handle400WithValidations(options: Handle4xxOptions): MonoTypeOperatorFunction<ClientValidationError|RestClientError>
// {
//     return source =>
//     {
//         return source.pipe(catchError(err => handle400WithValidationsFunc(err,
//                                                                           options,
//                                                                           error => throwError(() => error),
//                                                                           error => of(new RestClientError(error.errors)),
//                                                                           error => of(new ClientValidationError(error.errors, error.validationErrors)))));
//     };
// }
