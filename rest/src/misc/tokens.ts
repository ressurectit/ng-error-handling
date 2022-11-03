import {InjectionToken} from '@angular/core';

import {ClientErrorHandlingMiddlewareOptions} from './clientErrorHandlingMiddleware.options';

/**
 * Injection token for global client error handling middleware options
 */
export const CLIENT_ERROR_HANDLING_MIDDLEWARE_OPTIONS: InjectionToken<ClientErrorHandlingMiddlewareOptions> = new InjectionToken<ClientErrorHandlingMiddlewareOptions>('CLIENT_ERROR_HANDLING_MIDDLEWARE_OPTIONS', {providedIn: 'root', factory: () => new ClientErrorHandlingMiddlewareOptions()});