import {Injector} from '@angular/core';

import {CatchHttpClientErrorBehavior} from '../../misc/enums';
import {HttpClientErrorHandlers, HttpClientErrorMessages} from '../../misc/types';

/**
 * Options for catch http client errors
 */
export interface CatchHttpClientErrorOptions
{
    /**
     * Instance of injector used for obtaining dependencies
     */
    injector: Injector;

    /**
     * Behavior of catch http client error, default is `CatchHttpClientErrorBehavior.Suppress`
     */
    behavior?: CatchHttpClientErrorBehavior|null;

    /**
     * Indication whether skip displaying of notifications for errors
     */
    skipErrorNotifications?: boolean|null;

    /**
     * Indication whether skip server validation errors processing
     */
    skipServerValidationErrors?: boolean|null;

    /**
     * Indication whether forcibly display custom message if present, not only as fallback but always
     */
    forceCustomMessageDisplay?: boolean|null;

    /**
     * Object storing default messages to be displayed for specific http status codes
     */
    messages?: HttpClientErrorMessages|null;

    /**
     * Object storing default error handlers for specific http status codes
     */
    handlers?: HttpClientErrorHandlers|null;
}