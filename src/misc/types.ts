import {HttpErrorResponse} from '@angular/common/http';
import {Func1, Func4Rest, PromiseOr} from '@jscrpt/common';

import {Handle4xxOptions, XXXHttpClientError, HttpClientValidationErrors} from '../interfaces';

/**
 * Response mapper for http client errors that are converted to array of error messages
 */
export type HttpClientErrorResponseMapper = (err: HttpErrorResponse) => PromiseOr<string[]>;

/**
 * Response mapper for http client validation errors that are converted into object RestClientValidationErrors
 */
export type HttpClientValidationErrorResponseMapper = (err: HttpErrorResponse) => PromiseOr<HttpClientValidationErrors|null>;

/**
 * Custom handler for `HttpErrorResponse`
 */
export type HttpClientErrorCustomHandler<TError = unknown,
                                         TClientError = unknown,
                                         TClientValidationError = TClientError> = Func4Rest<TError|TClientError|TClientValidationError,
                                                                                            HttpErrorResponse,
                                                                                            Handle4xxOptions,
                                                                                            Func1<TError, HttpErrorResponse>,
                                                                                            Func1<TClientError, XXXHttpClientError>,
                                                                                            [Func1<TClientValidationError, XXXHttpClientError>?]>;