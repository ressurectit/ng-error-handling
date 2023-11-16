import {Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {HTTP_CLIENT_ERROR_RESPONSE_MAPPER, HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER} from './tokens';
import {HttpClientErrorResponseMapper, HttpClientValidationErrorResponseMapper} from './types';
import {HttpClientErrors, HttpClientValidationErrors} from '../interfaces';

/**
 * Reads errors and validation errors from http error response
 * @param error - Object with http error response
 * @param injector - Angular injector used for obtaining global options
 * @param clientErrorsResponseMapper - Function that extracts client errors from response
 * @param clientValidationErrorsResponseMapper - Functino that extracts validation errors from response
 */
export function readErrorsFromHttpErrorResponse(error: HttpErrorResponse, injector?: Injector, clientErrorsResponseMapper?: HttpClientErrorResponseMapper, clientValidationErrorsResponseMapper?: HttpClientValidationErrorResponseMapper): HttpClientErrors
{
    clientErrorsResponseMapper ??= injector?.get(HTTP_CLIENT_ERROR_RESPONSE_MAPPER);
    clientValidationErrorsResponseMapper ??= injector?.get(HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER);

    let errors: string[] = [];
    let validationErrors: HttpClientValidationErrors|null = null;

    if(clientErrorsResponseMapper)
    {
        errors = clientErrorsResponseMapper(error);
    }

    if(clientValidationErrorsResponseMapper)
    {
        validationErrors = clientValidationErrorsResponseMapper(error);
    }

    //in case of incorrect type
    if(!Array.isArray(errors))
    {
        errors = [errors];
    }

    return {
        errors,
        validationErrors,
    };
}