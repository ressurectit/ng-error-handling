import {Injector} from "@angular/core";
import {isPresent} from "@jscrpt/common";
import {GlobalNotificationsService} from "@anglr/notifications";
import {Observer} from "rxjs";

/**
 * Action called when 503 http status code is intercepted
 */
export type ServiceUnavailableAction = (injector: Injector, observer: Observer<void>) => void;

/**
 * Options for ServiceUnavailableInterceptorOptions
 */
export class ServiceUnavailableInterceptorOptions
{
    /**
     * Text displayed
     */
    text?: string = "Remote server is unavailable. Try again later.";

    /**
     * Action called when 504 status code received
     */
    action?: ServiceUnavailableAction = (injector: Injector, observer: Observer<any>) =>
    {
        let notifications = injector.get(GlobalNotificationsService);

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
     * @param text Text displayed
     * @param action Action called when 503 status code received
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