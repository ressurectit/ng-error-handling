import {Injector} from '@angular/core';
import {isPresent} from '@jscrpt/common';
import {Observer} from 'rxjs';

import {ERROR_HANDLING_NOTIFICATIONS} from '../misc/tokens';

/**
 * Action called when 0 http status code is intercepted
 */
export type NoConnectionAction = (injector: Injector, observer: Observer<any>) => void;

/**
 * Options for NoConnectionInterceptor
 */
export class NoConnectionInterceptorOptions
{
    /**
     * Text displayed
     */
    text: string = 'Server is offline. Try again later.';

    /**
     * Action called when 0 status code received
     */
    action: NoConnectionAction = (injector: Injector, observer: Observer<any>) =>
    {
        const notifications = injector.get(ERROR_HANDLING_NOTIFICATIONS);

        if(isPresent(notifications))
        {
            notifications.warning(this.text);
        }
        else
        {
            console.warn('Missing "GlobalNotificationsService"! Unable to show NoConnection info.');
        }

        observer.complete();
    };

    //######################### constructor #########################

    /**
     * Creates instance of NoConnectionInterceptorOptions
     * @param text - Text displayed
     * @param action - Action called when 0 status code received
     **/
    constructor(text?: string, action?: NoConnectionAction)
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