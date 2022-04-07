import {Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Response mapper for http client errors that are converted to array of error strings
 */
export type RestClientErrorResponseMapper = (err: HttpErrorResponse) => string[];

/**
 * Response mapper for http client validation errors that are converted into object RestClientValidationErrors
 */
export type RestClientValidationErrorResponseMapper = (err: HttpErrorResponse) => RestClientValidationErrors|null;

/**
 * Custom handler for `HttpErrorResponse`
 */
export type RestClientErrorCustomHandler<TResponse = any> = (err: HttpErrorResponse) => Observable<HttpErrorResponse|TResponse>;

/**
 * Contains metadata for client errors configuration
 */
export interface RestClientErrors extends TypedPropertyDescriptor<any> 
{
    /**
     * Array of ignored client errors that will be added to default ones
     */
    addIgnoredClientErrors?: number[];

    /**
     * Response mapper for client errors
     */
    clientErrorsResponseMapper?: RestClientErrorResponseMapper;

    /**
     * Custom error handlers for specific status codes
     */
    customErrorHandlers?: Record<number, RestClientErrorCustomHandler>;
}

/**
 * Validation errors for single validated property
 */
export interface RestClientValidationError
{
    /**
     * Name or type of error and its text
     */
    [error: string]: string;
}

/**
 * Object storing validations errors from server
 */
export interface RestClientValidationErrors
{
    /**
     * Name of property and its validation errors
     */
    [property: string]: RestClientValidationError;
}

/**
 * Options passed for handle 400 http status code with validations
 */
export interface Handle400WithValidationsOptions
{
    /**
     * Injector used for obtaining dependencies
     */
    injector: Injector;

    /**
     * Response mapper for client errors
     */
    clientErrorsResponseMapper?: RestClientErrorResponseMapper;

    /**
     * Response mapper for client validation errors
     */
    clientValidationErrorsResponseMapper?: RestClientValidationErrorResponseMapper;
}
