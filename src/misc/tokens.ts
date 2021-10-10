import {InjectionToken} from '@angular/core';
import {Notifications} from '@anglr/common';

/**
 * Injection token used for injecting notifications service used withing error handling package
 */
export const ERROR_HANDLING_NOTIFICATIONS: InjectionToken<Notifications> = new InjectionToken<Notifications>('ERROR_HANDLING_NOTIFICATIONS');