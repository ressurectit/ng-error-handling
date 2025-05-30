import {InjectionToken} from '@angular/core';
import {Notifications} from '@anglr/common';

import {HttpClientErrorConfigs, HttpClientErrorHandlers, HttpClientErrorResponseMapper, HttpClientValidationErrorResponseMapper} from './types';
import {AnglrExceptionExtender, InternalServerErrorRenderer} from '../interfaces';
import {DummyInternalServerErrorRenderer} from '../services';

/**
 * Injection token used for injecting notifications service used withing error handling package
 */
export const ERROR_HANDLING_NOTIFICATIONS: InjectionToken<Notifications> = new InjectionToken<Notifications>('ERROR_HANDLING_NOTIFICATIONS');

/**
 * Injection token that represents default response mapper for http client errors
 */
export const HTTP_CLIENT_ERROR_RESPONSE_MAPPER: InjectionToken<HttpClientErrorResponseMapper> = new InjectionToken<HttpClientErrorResponseMapper>('HTTP_CLIENT_ERROR_RESPONSE_MAPPER', {providedIn: 'root', factory: () => err => [err?.error?.toString()]});

/**
 * Injection token used for injecting notifications service used for displaying http client errors
 */
export const CLIENT_ERROR_NOTIFICATIONS: InjectionToken<Notifications> = new InjectionToken<Notifications>('CLIENT_ERROR_NOTIFICATIONS');

/**
 * Injection token that represents default response mapper for http client validation errors
 */
export const HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER: InjectionToken<HttpClientValidationErrorResponseMapper> = new InjectionToken<HttpClientValidationErrorResponseMapper>('HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER');

/**
 * Injection token used for injecting multiple AnglrExceptionExtender
 */
export const ANGLR_EXCEPTION_EXTENDERS: InjectionToken<AnglrExceptionExtender[]> = new InjectionToken<AnglrExceptionExtender[]>('ANGLR_EXCEPTION_EXTENDERS');

/**
 * Injection token used for InternalServerErrorRenderer
 */
export const INTERNAL_SERVER_ERROR_RENDERER: InjectionToken<InternalServerErrorRenderer> = new InjectionToken<InternalServerErrorRenderer>('INTERNAL_SERVER_ERROR_RENDERER', {providedIn: 'root', factory: () => new DummyInternalServerErrorRenderer()});

/**
 * Injection token that contains array of http status codes that are ignored
 */
export const HTTP_IGNORED_CLIENT_ERRORS: InjectionToken<number[]> = new InjectionToken<number[]>('HTTP_IGNORED_CLIENT_ERRORS', {providedIn: 'root', factory: () => [401, 403]});

/**
 * Injection token that contains custom configs for http client error handlers for specific http status codes
 */
export const HTTP_CLIENT_ERROR_CONFIGS: InjectionToken<HttpClientErrorConfigs> = new InjectionToken<HttpClientErrorConfigs>('HTTP_CLIENT_ERROR_CONFIGS');

/**
 * Injection token that contains custom client error handlers
 */
export const HTTP_CLIENT_ERROR_HANDLERS: InjectionToken<HttpClientErrorHandlers> = new InjectionToken<HttpClientErrorHandlers>('HTTP_CLIENT_ERROR_HANDLERS');
