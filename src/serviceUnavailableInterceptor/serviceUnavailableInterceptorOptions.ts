import {Injector} from '@angular/core';
import {isPresent} from '@jscrpt/common';
import {Observer} from 'rxjs';

import {ERROR_HANDLING_NOTIFICATIONS} from '../misc/tokens';

/**
 * Action called when 503 http status code is intercepted
 */
export type ServiceUnavailableAction = (injector: Injector, observer: Observer<any>) => void;

/**
 * Options for ServiceUnavailableInterceptorOptions
 */
export class ServiceUnavailableInterceptorOptions
{
    /**
     * Text displayed
     */
    text: string = 'Remote server is unavailable. Try again later.';

    /**
     * Action called when 504 status code received
     */
    action: ServiceUnavailableAction = (injector: Injector, observer: Observer<any>) =>
    {
        const notifications = injector.get(ERROR_HANDLING_NOTIFICATIONS);

        if(isPresent(notifications))
        {
            notifications.error(this.text);
        }
        else
        {
            console.warn('Missing "GlobalNotificationsService"! Unable to show ServiceUnavailable error.');
        }

        observer.complete();
    };

    //######################### constructor #########################

    /**
     * Creates instance of ServiceUnavailableInterceptorOptions
     * @param text - Text displayed
     * @param action - Action called when 503 status code received
     **/
    constructor(text?: string, action?: ServiceUnavailableAction)
    {
        if(isPresent(text))
        {
            this.text = text;
        }

        if(isPresent(action))
        {
            this.action = action;
        }
    }
}