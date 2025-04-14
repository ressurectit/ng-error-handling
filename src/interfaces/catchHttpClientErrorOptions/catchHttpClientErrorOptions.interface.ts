import {Injector} from '@angular/core';

import {HttpClientErrorConfigs, HttpClientErrorHandlers} from '../../misc/types';
import {CatchHttpClientErrorHttpStatusCodeOptions} from '../catchHttpClientErrorHttpStatusCodeOptions/catchHttpClientErrorHttpStatusCodeOptions.interface';

/**
 * Options for catch http client errors
 */
export interface CatchHttpClientErrorOptions extends Omit<CatchHttpClientErrorHttpStatusCodeOptions, 'message'>
{
    /**
     * Instance of injector used for obtaining dependencies
     */
    injector: Injector;

    /**
     * Object storing options/config for specific http status codes
     */
    configs?: HttpClientErrorConfigs|null;

    /**
     * Object storing default error handlers for specific http status codes
     */
    handlers?: HttpClientErrorHandlers|null;
}
