import {Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {HTTP_CLIENT_ERROR_RESPONSE_MAPPER, HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER} from './tokens';
import {HttpClientErrorResponseMapper, HttpClientValidationErrorResponseMapper} from './types';
import {HttpClientErrors, HttpClientValidationErrors} from '../interfaces';
import {HttpClientError} from './classes/httpClientError';
import {CatchHttpClientErrorBehavior} from './enums';

/**
 * Reads errors and validation errors from http error response
 * @param error - Object with http error response
 * @param injector - Angular injector used for obtaining global options
 * @param clientErrorsResponseMapper - Function that extracts client errors from response
 * @param clientValidationErrorsResponseMapper - Function that extracts validation errors from response
 */
export async function readErrorsFromHttpErrorResponse(error: HttpErrorResponse, injector?: Injector, clientErrorsResponseMapper?: HttpClientErrorResponseMapper|null, clientValidationErrorsResponseMapper?: HttpClientValidationErrorResponseMapper|null): Promise<HttpClientErrors>
{
    clientErrorsResponseMapper ??= injector?.get(HTTP_CLIENT_ERROR_RESPONSE_MAPPER);
    clientValidationErrorsResponseMapper ??= injector?.get(HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER);

    let errors: string[] = [];
    let validationErrors: HttpClientValidationErrors|null = null;

    if(clientErrorsResponseMapper)
    {
        errors = await clientErrorsResponseMapper(error);
    }

    if(clientValidationErrorsResponseMapper)
    {
        validationErrors = await clientValidationErrorsResponseMapper(error);
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

/**
 * Gets result of catch http client error according provided behavior
 * @param error - Instance of error
 * @param behavior - Requested behavior
 */
export function applyBehavior<TError extends HttpClientError>(error: TError, behavior: CatchHttpClientErrorBehavior): TError|null
{
    switch(behavior)
    {
        default:
        //case CatchHttpClientErrorBehavior.Suppress:
        {
            return null;
        }
        case CatchHttpClientErrorBehavior.PassThrogh:
        {
            return error;
        }
        case CatchHttpClientErrorBehavior.Throw:
        {
            throw error;
        }
    }
}
