import {Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Func1, Func4Rest} from '@jscrpt/common';

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
export type HttpClientErrorCustomHandler<TError = any,
                                         TClientError = any,
                                         TClientValidationError = TClientError> = Func4Rest<TError|TClientError|TClientValidationError,
                                                                                            HttpErrorResponse,
                                                                                            Handle4xxOptions,
                                                                                            Func1<TError, HttpErrorResponse>,
                                                                                            Func1<TClientError, HttpClientError>,
                                                                                            [Func1<TClientValidationError, HttpClientError>?]>;

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
     * Response mapper for http client errors
     */
    clientErrorsResponseMapper?: HttpClientErrorResponseMapper;

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