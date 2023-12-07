import {HttpErrorResponse} from '@angular/common/http';
import {Func1, Func4Rest, PromiseOr} from '@jscrpt/common';

import {Handle4xxOptions, XXXHttpClientError, HttpClientValidationErrors, HttpClientErrorHandler} from '../interfaces';
import {HttpClientError} from './classes/httpClientError';

/**
 * Response mapper for http client errors that are converted to array of error messages
 */
export type HttpClientErrorResponseMapper = (err: HttpErrorResponse) => PromiseOr<string[]>;

/**
 * Response mapper for http client validation errors that are converted into object RestClientValidationErrors
 */
export type HttpClientValidationErrorResponseMapper = (err: HttpErrorResponse) => PromiseOr<HttpClientValidationErrors|null>;

/**
 * Object storing error messages for http client errors according status code
 */
export type HttpClientErrorMessages = Record<number, string|undefined|null>;

/**
 * Object storing error handlers for http client errors according status code
 */
export type HttpClientErrorHandlers = Record<number, HttpClientErrorHandler<HttpClientError>|undefined|null>;

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