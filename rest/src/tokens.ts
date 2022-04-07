import {InjectionToken} from '@angular/core';
import {Notifications} from '@anglr/common';

import {RestClientErrorCustomHandler, RestClientErrorResponseMapper, RestClientValidationErrorResponseMapper} from './rest.interface';

/**
 * Injection token that contains array of http status codes that are ignored by clientErrorHandling middleware
 */
export const REST_IGNORED_CLIENT_ERRORS: InjectionToken<number[]> = new InjectionToken<number[]>('REST_IGNORED_CLIENT_ERRORS', {providedIn: 'root', factory: () => [401, 403]});

/**
 * Injection token that represents default response mapper for client errors
 */
export const REST_CLIENT_ERRORS_RESPONSE_MAPPER: InjectionToken<RestClientErrorResponseMapper> = new InjectionToken<RestClientErrorResponseMapper>('REST_CLIENT_ERRORS_RESPONSE_MAPPER', {providedIn: 'root', factory: () => err => [err?.error?.toString()]});

/**
 * Injection token used for injecting notifications service used for displaying client errors
 */
export const CLIENT_ERROR_NOTIFICATIONS: InjectionToken<Notifications> = new InjectionToken<Notifications>('CLIENT_ERROR_NOTIFICATIONS');

/**
 * Injection token used for injecting map of custom client errors handler
 */
export const CUSTOM_CLIENT_ERROR_HANDLER: InjectionToken<Record<number, RestClientErrorCustomHandler>> = new InjectionToken<Record<number, RestClientErrorCustomHandler>>('CUSTOM_CLIENT_ERROR_HANDLER');

/**
 * Injection token used for injecting map of custom client validation errors handler
 */
export const REST_CLIENT_VALIDATION_ERRORS_RESPONSE_MAPPER: InjectionToken<RestClientValidationErrorResponseMapper> = new InjectionToken<RestClientValidationErrorResponseMapper>('REST_CLIENT_VALIDATION_ERRORS_RESPONSE_MAPPER');
