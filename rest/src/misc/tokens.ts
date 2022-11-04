import {InjectionToken} from '@angular/core';

import {ClientErrorHandlingOptions} from './clientErrorHandling.options';
import {HttpClientErrorCustomHandlerDef} from './types';

/**
 * Injection token that contains array of http status codes that are ignored by http client error code
 */
export const HTTP_IGNORED_CLIENT_ERRORS: InjectionToken<number[]> = new InjectionToken<number[]>('HTTP_IGNORED_CLIENT_ERRORS', {providedIn: 'root', factory: () => [401, 403]});

/**
 * Injection token used for injecting map of custom client errors handler
 */
export const HTTP_CLIENT_ERROR_CUSTOM_HANDLER: InjectionToken<Record<number, HttpClientErrorCustomHandlerDef>> = new InjectionToken<Record<number, HttpClientErrorCustomHandlerDef>>('HTTP_CLIENT_ERROR_CUSTOM_HANDLER');

/**
 * Injection token for global client error handling middleware options
 */
export const CLIENT_ERROR_HANDLING_MIDDLEWARE_OPTIONS: InjectionToken<ClientErrorHandlingOptions> = new InjectionToken<ClientErrorHandlingOptions>('CLIENT_ERROR_HANDLING_MIDDLEWARE_OPTIONS', {providedIn: 'root', factory: () => new ClientErrorHandlingOptions()});