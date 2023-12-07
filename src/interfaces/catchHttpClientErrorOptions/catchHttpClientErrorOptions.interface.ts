import {Injector} from '@angular/core';

import {CatchHttpClientErrorBehavior} from '../../misc/enums';

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
    behavior?: CatchHttpClientErrorBehavior;

    /**
     * Indication whether skip displaying of notifications for errors
     */
    skipErrorNotifications?: boolean;
}