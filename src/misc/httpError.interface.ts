import {Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ClientErrorHandlingOptions} from './clientErrorHandling.options';

/**
 * Response mapper for http client errors that are converted to array of error messages
 */
export type HttpClientErrorResponseMapper = (err: HttpErrorResponse) => string[];

/**
 * Response mapper for http client validation errors that are converted into object RestClientValidationErrors
 */
export type HttpClientValidationErrorResponseMapper = (err: HttpErrorResponse) => HttpClientValidationErrors|null;

/**
 * Custom handler for `HttpErrorResponse` 
 */
export type HttpClientErrorCustomHandler<TResponse = any> = (err: HttpErrorResponse) => Observable<HttpErrorResponse|TResponse>;

/**
 * Validation errors for single validated property
 */
export interface HttpClientPropertyValidationError
{
    /**
     * Name or type of error and its text
     */
    [error: string]: string;
}

/**
 * Object storing validations errors from server
 */
export interface HttpClientValidationErrors
{
    /**
     * Name of property and its validation errors
     */
    [property: string]: HttpClientPropertyValidationError;
}

/**
 * Options passed for handle 4xx http status codes
 */
export interface Handle4xxOptions
{
    /**
     * Injector used for obtaining dependencies
     */
    injector?: Injector;

    /**
     * Options for client error handling
     */
    options?: ClientErrorHandlingOptions;

    /**
     * Response mapper for http client errors
     */
    clientErrorsResponseMapper?: HttpClientErrorResponseMapper;
}

/**
 * Options passed for handle 400 http status code with validations
 */
export interface Handle400WithValidationsOptions extends Handle4xxOptions
{
    /**
     * Response mapper for http client validation errors
     */
    clientValidationErrorsResponseMapper?: HttpClientValidationErrorResponseMapper;
}

/**
 * Definition of http client errors read from http error response
 */
export interface HttpClientErrors
{
    /**
     * Array of error
     */
    errors: string[];

    /**
     * Object storing validation errors
     */
    validationErrors: HttpClientValidationErrors|null;
}

/**
 * Http client error, containing extracted errors and original
 */
export interface HttpClientError extends HttpClientErrors
{
    /**
     * Original http error response
     */
    httpResponse: HttpErrorResponse;
}