import {InjectionToken} from '@angular/core';
import {Notifications} from '@anglr/common';

import {HttpClientErrorCustomHandler, HttpClientErrorResponseMapper, HttpClientValidationErrorResponseMapper} from './httpError.interface';

/**
 * Injection token used for injecting notifications service used withing error handling package
 */
export const ERROR_HANDLING_NOTIFICATIONS: InjectionToken<Notifications> = new InjectionToken<Notifications>('ERROR_HANDLING_NOTIFICATIONS');

/**
 * Injection token that contains array of http status codes that are ignored by http client error code
 */
export const HTTP_IGNORED_CLIENT_ERRORS: InjectionToken<number[]> = new InjectionToken<number[]>('HTTP_IGNORED_CLIENT_ERRORS', {providedIn: 'root', factory: () => [401, 403]});

/**
 * Injection token that represents default response mapper for http client errors
 */
export const HTTP_CLIENT_ERROR_RESPONSE_MAPPER: InjectionToken<HttpClientErrorResponseMapper> = new InjectionToken<HttpClientErrorResponseMapper>('HTTP_CLIENT_ERROR_RESPONSE_MAPPER', {providedIn: 'root', factory: () => err => [err?.error?.toString()]});

/**
 * Injection token used for injecting notifications service used for displaying http client errors
 */
export const CLIENT_ERROR_NOTIFICATIONS: InjectionToken<Notifications> = new InjectionToken<Notifications>('CLIENT_ERROR_NOTIFICATIONS');

/**
 * Injection token used for injecting map of custom client errors handler
 */
export const HTTP_CLIENT_ERROR_CUSTOM_HANDLER: InjectionToken<Record<number, HttpClientErrorCustomHandler>> = new InjectionToken<Record<number, HttpClientErrorCustomHandler>>('HTTP_CLIENT_ERROR_CUSTOM_HANDLER');

/**
 * Injection token that represents default response mapper for http client validation errors
 */
export const HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER: InjectionToken<HttpClientValidationErrorResponseMapper> = new InjectionToken<HttpClientValidationErrorResponseMapper>('HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER');
