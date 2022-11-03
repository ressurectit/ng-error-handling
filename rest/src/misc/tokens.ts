import {InjectionToken} from '@angular/core';
import {HttpClientErrorCustomHandler} from '@anglr/error-handling';

import {ClientErrorHandlingMiddlewareOptions} from './clientErrorHandlingMiddleware.options';
import {WithRestClientContext} from './withRestClientContext';

/**
 * Injection token that contains array of http status codes that are ignored by http client error code
 */
export const HTTP_IGNORED_CLIENT_ERRORS: InjectionToken<number[]> = new InjectionToken<number[]>('HTTP_IGNORED_CLIENT_ERRORS', {providedIn: 'root', factory: () => [401, 403]});

/**
 * Injection token used for injecting map of custom client errors handler
 */
export const HTTP_CLIENT_ERROR_CUSTOM_HANDLER: InjectionToken<Record<number, HttpClientErrorCustomHandler|WithRestClientContext<HttpClientErrorCustomHandler>>> = new InjectionToken<Record<number, HttpClientErrorCustomHandler|WithRestClientContext<HttpClientErrorCustomHandler>>>('HTTP_CLIENT_ERROR_CUSTOM_HANDLER');

/**
 * Injection token for global client error handling middleware options
 */
export const CLIENT_ERROR_HANDLING_MIDDLEWARE_OPTIONS: InjectionToken<ClientErrorHandlingMiddlewareOptions> = new InjectionToken<ClientErrorHandlingMiddlewareOptions>('CLIENT_ERROR_HANDLING_MIDDLEWARE_OPTIONS', {providedIn: 'root', factory: () => new ClientErrorHandlingMiddlewareOptions()});