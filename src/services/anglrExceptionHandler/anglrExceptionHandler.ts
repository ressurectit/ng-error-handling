import {ClassProvider, Optional, ErrorHandler, Injectable, Inject, PLATFORM_ID, Injector} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {LOGGER, Logger, Notifications} from '@anglr/common';
import {isBlank, isPresent} from '@jscrpt/common';
import sourceMap from 'sourcemapped-stacktrace';

import {AnglrExceptionHandlerOptions} from './anglrExceptionHandlerOptions';
import {ANGLR_EXCEPTION_EXTENDERS, ERROR_HANDLING_NOTIFICATIONS} from '../../misc/tokens';
import {AnglrExceptionExtender, AngularError, ErrorWithStack} from '../../interfaces';

/**
 * Exception handler that is capable of customized handling of unhandled errors
 */
@Injectable()
export class AnglrExceptionHandler implements ErrorHandler 
{
    //######################### private fields #########################

    /**
     * Indication that code runs in browser
     */
    private _isBrowser: boolean = false;

    //######################### constructor #########################
    constructor(@Optional() private _options: AnglrExceptionHandlerOptions,
                @Optional() @Inject(ERROR_HANDLING_NOTIFICATIONS) private _notifications: Notifications,
                @Inject(ANGLR_EXCEPTION_EXTENDERS) @Optional() private _extenders: AnglrExceptionExtender[],
                @Inject(LOGGER) private _logger: Logger,
                private _injector: Injector,
                @Inject(PLATFORM_ID) platformId: Object)
    {
        this._isBrowser = isPlatformBrowser(platformId);

        if(isBlank(_options))
        {
            this._options = new AnglrExceptionHandlerOptions();
        }

        if(isBlank(this._extenders))
        {
            this._extenders = [];
        }
    }
    
    //######################### public methods - implementation of IExceptionHandler #########################
    
    /**
     * Method called when exception occurs
     * @param error - Occured exception object
     */
    public async handleError(error: AngularError): Promise<void>
    {
        error = error || <any>{};

        const message = error.message || (error.toString ? error.toString() : `${error}`);
        let originalStack = error.stack || '';
        let stack = await this._fromSourceMap(originalStack);
        
        if(this._notifications && isPresent(message))
        {
            this._notifications.error(message);
        }

        if(error.rejection)
        {
            originalStack += `--------------------------PROMISE STACK--------------------------------
${error.rejection.stack}`;

            const rejectionStack = await this._fromSourceMap(error.rejection.stack);

            stack += `--------------------------PROMISE STACK--------------------------------
${rejectionStack}`;
        }
        
        if(this._options.debugMode)
        {
            console.error(`
MESSAGE: ${message}
STACKTRACE: ${stack}
ORIGINAL STACKTRACE: ${originalStack}}`, error);

            if(error.rejection)
            {
                console.error(`
PROMISE ERROR MESSAGE: ${error.rejection.message}
PROMISE ERROR STACKTRACE: ${error.rejection.stack}`);
            }

            if(this._options.showAlsoAlert)
            {
                alert(message);
            }
        }

        let logError: ErrorWithStack = 
        {
            message: message,
            stack: stack,
            name: error.name
        };

        //extend error
        for(const extender of this._extenders)
        {
            logError = await extender(this._injector, logError);
        }

        this._logger.error('Unhandled error: {{@logError}}', {logError});
    }
    
    //######################### private methods #########################

    /**
     * Converts stacktrace using source map
     * @param stack - Current stacktrace
     */
    private _fromSourceMap(stack?: string|string[]): Promise<string>
    {
        if(this._isBrowser && !!stack)
        {
            return new Promise(resolve =>
            {
                sourceMap.mapStackTrace(stack, sourceStack => resolve(sourceStack.join('\n')), {cacheGlobally: true});
            });
        }

        return Promise.resolve(stack as string);
    }
}

/**
 * Anglr custom exception handler provider
 */
export const ANGLR_EXCEPTION_HANDLER_PROVIDER: ClassProvider = 
{
    provide: ErrorHandler,
    useClass: AnglrExceptionHandler
};