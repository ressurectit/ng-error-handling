import {ClassProvider, Optional, ErrorHandler, Injectable} from '@angular/core';
import {ReportingExceptionHandlerOptions} from './reportingExceptionHandlerOptions';
import {ReportingExceptionHandlerService} from './reportingExceptionHandler.service';
import {GlobalNotificationsService} from '@anglr/notifications';
import {isArray, isString, isFunction, isBlank, isPresent} from '@anglr/common';
import {ErrorWithStack} from './errorWithStack';
import {AngularError} from './angularError';
import * as html2canvas from 'html2canvas';
import * as $ from 'jquery';

/**
 * Exception handler that is capable of reporting and logging occured exceptions
 */
@Injectable()
class ReportingExceptionHandler implements ErrorHandler 
{
    //######################### constructor #########################
    constructor(@Optional() private _options: ReportingExceptionHandlerOptions,
                @Optional() private _loggingService: ReportingExceptionHandlerService,
                @Optional() private _globalNotifications: GlobalNotificationsService)
    {
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
     * @param  {AngularError} error Occured exception object
     */
    public handleError(error: AngularError): void
    {
        var message = error.message;
        var stack = error.stack;
        
        if(this._globalNotifications)
        {
            this._globalNotifications.error(message);
        }

        if(error.rejection)
        {
            stack += `--------------------------PROMISE STACK--------------------------------
${error.rejection.stack}`;
        }
        
        if(this._options.enableServerLogging)
        {
            var html: string = "";
            
            if(this._options.captureScreenHtml)
            {
                html = this._takeHtmlSnapshot(this._options.captureHtmlInputs);
            }
            
            if(this._options.captureScreenImage)
            {
                this._takeScreenShot()
                    .then(screenshot =>
                    {
                        this._loggingService.sendReport(message, stack, html, screenshot);
                    });
            }
            else
            {
                this._loggingService.sendReport(message, stack, html, "");
            }
        }
        
        if(this._options.debugMode)
        {
            console.error(`
MESSAGE: ${error.message}
STACKTRACE: ${error.stack}`, error);

            if(error.rejection)
            {
                console.error(`
PROMISE ERROR MESSAGE: ${error.rejection.message}
PROMISE ERROR STACKTRACE: ${error.rejection.stack}`);
            }

            alert(message);
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
     * @param  {boolean} includeForms Indication whether include forms data in captured html
     */
    private _takeHtmlSnapshot(includeForms: boolean): string
    {
        //TODO - dorobit podporu pre nastavenie selected pre zvolenu polozku, alebo to otestovat pre SELECT
        var processedHtml = $("html").clone(false);
        
        if(this._options.captureHtmlInputs)
        {
            $(":input", processedHtml).each(function()
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
                        $this.attr("value", $this.val());
                    }
                }
            });
        }
        
        return `<html>${processedHtml.html()}</html>`;
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