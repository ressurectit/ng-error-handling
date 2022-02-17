import {Injector} from '@angular/core';
import {isPresent} from '@jscrpt/common';
import {Observer} from 'rxjs';

import {ERROR_HANDLING_NOTIFICATIONS} from '../misc/tokens';

/**
 * Action called when 504 http status code is intercepted
 */
export type HttpGatewayTimeoutAction = (injector: Injector, observer: Observer<any>) => void;

/**
 * Options for HttpGatewayTimeoutInterceptor
 */
export class HttpGatewayTimeoutInterceptorOptions
{
    /**
     * Text displayed
     */
    text: string = 'Server did not respond in defined time.';

    /**
     * Action called when 504 status code received
     */
    action: HttpGatewayTimeoutAction = (injector: Injector, observer: Observer<any>) =>
    {
        const notifications = injector.get(ERROR_HANDLING_NOTIFICATIONS);

        if(isPresent(notifications))
        {
            notifications.error(this.text);
        }
        else
        {
            console.warn('Missing "GlobalNotificationsService"! Unable to show HttpGatewayTimeout error.');
        }

        observer.complete();
    };

    //######################### constructor #########################

    /**
     * Creates instance of HttpGatewayTimeoutInterceptorOptions
     * @param text - Text displayed
     * @param action - Action called when 504 status code received
     **/
    constructor(text?: string, action?: HttpGatewayTimeoutAction)
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