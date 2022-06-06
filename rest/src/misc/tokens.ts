import {InjectionToken} from '@angular/core';
import {RestMiddlewareOrderType} from '@anglr/rest';

import {ERROR_HANDLING_REST_MIDDLEWARES_ORDER} from './defaults';

/**
 * Injection token used for injecting array of rest middleware types that defines order of rest middlewares, including error handling middleware
 */
export const REST_ERROR_HANDLING_MIDDLEWARES_ORDRE: InjectionToken<RestMiddlewareOrderType<string>[]> = new InjectionToken<RestMiddlewareOrderType<string>[]>('REST_ERROR_HANDLING_MIDDLEWARES_ORDER', {providedIn: 'root', factory: () => ERROR_HANDLING_REST_MIDDLEWARES_ORDER});
