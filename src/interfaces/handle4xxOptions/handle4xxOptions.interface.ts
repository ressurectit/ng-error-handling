import {Injector} from '@angular/core';

import {HttpClientErrorResponseMapper, HttpClientValidationErrorResponseMapper} from '../../misc/types';

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
