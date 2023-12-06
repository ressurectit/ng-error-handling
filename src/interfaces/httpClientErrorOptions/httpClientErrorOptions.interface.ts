import {Injector} from '@angular/core';

import {HttpClientErrorResponseMapper, HttpClientValidationErrorResponseMapper} from '../../misc/types';

/**
 * Options used for common handling of http client errors
 */
export interface HttpClientErrorOptions
{
    /**
     * Injector used for obtaining dependencies
     */
    injector: Injector;

    /**
     * Response mapper for http client errors
     */
    clientErrorsResponseMapper?: HttpClientErrorResponseMapper;

    /**
     * Response mapper for http client validation errors
     */
    clientValidationErrorsResponseMapper?: HttpClientValidationErrorResponseMapper;
}
