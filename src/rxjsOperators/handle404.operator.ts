// import {MonoTypeOperatorFunction, catchError, throwError, of, NEVER} from 'rxjs';

// import {handle404Func} from '../errorHandlers';
// import {Handle4xxOptions} from '../interfaces';
// import {RestNotFoundError} from '../misc/classes/restNotFoundError';

// /**
//  * Handles 404 http code as response and returns RestNotFoundError
//  * @param options - Options containing injector and mapper function for extraction of error messages
//  */
// export function handle404(options?: Handle4xxOptions): MonoTypeOperatorFunction<RestNotFoundError>
// {
//     return source =>
//     {
//         return source.pipe(catchError(err => handle404Func(err,
//                                                            options ?? {},
//                                                            error => throwError(() => error),
//                                                            error => of(new RestNotFoundError(error.errors)))));
//     };
// }

// /**
//  * Handles 404 http code as response and never returns
//  * @param options - Options containing injector and mapper function for extraction of error messages
//  */
// export function handle404Suppress(options?: Handle4xxOptions): MonoTypeOperatorFunction<never>
// {
//     return source =>
//     {
//         return source.pipe(catchError(err => handle404Func(err,
//                                                            options ?? {},
//                                                            error => throwError(() => error),
//                                                            () => NEVER)));
//     };
// }