import {Injector} from "@angular/core";
import {GlobalNotificationsService} from "@anglr/notifications";
import {isPresent} from "@anglr/common";
import {Observer} from "rxjs";

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
    text?: string = "Server is offline. You will be redirected to Asseco Centra Europe homepage.";

    /**
     * Action called when 0 status code received
     */
    action?: NoConnectionAction = (injector: Injector, observer: Observer<any>) =>
    {
        let notifications = injector.get(GlobalNotificationsService);

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
     * @param  {string} text Text displayed
     * @param  {NoConnectionAction} action Action called when 0 status code received
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