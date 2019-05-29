import {ClassProvider, Optional, ErrorHandler, Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {isBlank, isPresent} from '@jscrpt/common';
import {GlobalNotificationsService} from '@anglr/notifications';
import * as sourceMap from 'sourcemapped-stacktrace';
import * as html2canvas from 'html2canvas';
import * as $ from 'jquery';

import {ReportingExceptionHandlerOptions} from './reportingExceptionHandlerOptions';
import {ReportingExceptionHandlerService} from './reportingExceptionHandler.service';
import {AngularError} from './angularError';

/**
 * Exception handler that is capable of reporting and logging occured exceptions
 */
@Injectable()
export class ReportingExceptionHandler implements ErrorHandler 
{
    //######################### private fields #########################

    /**
     * Indication that code runs in browser
     */
    private _isBrowser: boolean = false;

    //######################### constructor #########################
    constructor(@Optional() private _options: ReportingExceptionHandlerOptions,
                @Optional() private _loggingService: ReportingExceptionHandlerService,
                @Optional() private _globalNotifications: GlobalNotificationsService,
                @Inject(PLATFORM_ID) platformId: Object)
    {
        this._isBrowser = isPlatformBrowser(platformId);

        if(isBlank(_options))
        {
            this._options = new ReportingExceptionHandlerOptions();
        }
        
        if(isBlank(_loggingService))
        {
            this._loggingService = new ReportingExceptionHandlerService();
        }
    }
    
    //######################### public methods - implementation of IExceptionHandler #########################
    
    /**
     * Method called when exception occurs
     * @param error Occured exception object
     */
    public async handleError(error: AngularError)
    {
        error = error || <any>{};

        let message = error.message || (error.toString ? error.toString() : `${error}`);
        let originalStack = error.stack || "";
        let stack = await this._fromSourceMap(originalStack);
        
        if(this._globalNotifications && isPresent(message))
        {
            this._globalNotifications.error(message);
        }

        if(error.rejection)
        {
            originalStack += `--------------------------PROMISE STACK--------------------------------
${error.rejection.stack}`;

            let rejectionStack = await this._fromSourceMap(error.rejection.stack);

            stack += `--------------------------PROMISE STACK--------------------------------
${rejectionStack}`;
        }
        
        if(this._options.enableServerLogging && this._isBrowser)
        {
            var html: string = "";
            
            if(this._options.captureScreenHtml)
            {
                html = this._takeHtmlSnapshot(this._options.captureHtmlInputs);
            }

            let screenshot = "";
            
            if(this._options.captureScreenImage)
            {
                screenshot = await this._takeScreenShot();
            }
                
            this._loggingService.sendReport(message, stack, html, screenshot);
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
    }
    
    //######################### private methods #########################
    
    /**
     * Method creates screenshot of current window
     */
    private _takeScreenShot(): Promise<string>
    {
        return new Promise(resolve =>
        {
            html2canvas(document.body).then(canvas => 
            {
                resolve(canvas.toDataURL().replace("data:image/png;base64,", ""));
            });
        });
    }
    
    /**
     * Creates snapshot of current html
     * @param includeForms Indication whether include forms data in captured html
     */
    private _takeHtmlSnapshot(includeForms: boolean): string
    {
        //TODO - dorobit podporu pre nastavenie selected pre zvolenu polozku, alebo to otestovat pre SELECT
        var processedHtml = $("html").clone(false);
        
        if(includeForms)
        {
            $(":input", processedHtml).each(function(this: any)
            {
                var $this = $(this);

                if($this.is("input"))
                {
                    if(this.type == "checkbox" || this.type == "radio")
                    {
                        if(this.checked)
                        {
                            $this.attr("checked", "checked");
                        }
                    }
                    else
                    {
                        $this.attr("value", <any>$this.val());
                    }
                }
            });
        }
        
        return `<html>${processedHtml.html()}</html>`;
    }

    /**
     * Converts stacktrace using source map
     * @param stack Current stacktrace
     */
    private _fromSourceMap(stack: string|string[]): Promise<string>
    {
        if(this._isBrowser && !!stack)
        {
            return new Promise(resolve =>
            {
                sourceMap.mapStackTrace(stack, sourceStack => resolve(sourceStack.join("\n")), {cacheGlobally: true});
            });
        }

        return Promise.resolve(stack as string);
    }
}

/**
 * Reporting exception handler provider
 */
export const REPORTING_EXCEPTION_HANDLER_PROVIDER: ClassProvider = 
{
    provide: ErrorHandler,
    useClass: ReportingExceptionHandler
};