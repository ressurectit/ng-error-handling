import {HttpErrorResponse} from '@angular/common/http';
import {PromiseOr} from '@jscrpt/common';

import {HttpClientValidationErrors, HttpClientErrorHandler, CatchHttpClientErrorHttpStatusCodeOptions} from '../interfaces';
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
 * Object storing specific options/config according status code
 */
export type HttpClientErrorConfigs = Record<number, CatchHttpClientErrorHttpStatusCodeOptions|undefined|null>;

/**
 * Object storing error handlers for http client errors according status code
 */
export type HttpClientErrorHandlers = Record<number, HttpClientErrorHandler<HttpClientError>|undefined|null>;
