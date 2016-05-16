import {provide, Provider, Optional, ExceptionHandler} from '@angular/core';
import {ReportingExceptionHandlerOptions} from './reportingExceptionHandlerOptions';
import {ReportingExceptionHandlerService} from './reportingExceptionHandler.service';
import {GlobalNotificationsService} from '@ng2/notifications';
import {isBlank, isArray, isString, isPresent, isFunction} from '@angular/core/src/facade/lang';
import html2canvas from 'tshtml2canvas';
import $ from 'tsjquery';

/**
 * Exception handler that is capable of reporting and logging occured exceptions
 */
class ReportingExceptionHandler extends ExceptionHandler 
{
    //######################### constructor #########################
    constructor(@Optional() private _options: ReportingExceptionHandlerOptions,
                @Optional() private _loggingService: ReportingExceptionHandlerService,
                @Optional() private _globalNotifications: GlobalNotificationsService)
    {
        super(null);
        
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
     * @param  {any} exception Occured exception object
     * @param  {any} stackTrace? Stacktrace for occured exception
     * @param  {string} reason? Reason of exception
     */
    public call(exception: any, stackTrace?: any, reason?: string) 
    {
        //TODO - add option to log only exception with message
        var message = null;
        var stack = "";
        
        if(isPresent(exception))
        {
            if(isPresent(exception.wrapperMessage))
            {
                message = exception.wrapperMessage;
            }
            else if(isPresent(exception.message))
            {
                message = exception.message;
            }
            else
            {
                if(isPresent(exception.toString) && isFunction(exception.toString))
                {
                    message = exception.toString();
                }
            }
            
            if(isPresent(exception.originalException))
            {
                message += "\r\nOriginal Exception: " + exception.originalException;
            }
        }
        
        if(isBlank(message))
        {
            console.warn("Unable to obtain error message");
            
            return;
        }
        
        if(this._globalNotifications)
        {
            this._globalNotifications.error(message);
        }
        
        if(stackTrace)
        {
            if(isArray(stackTrace))
            {
                stackTrace.forEach(trace =>
                {
                    stack += trace;
                    trace += "\n\n-------------------------------------------------\n\n";
                });
            }
            else if(isString(stackTrace))
            {
                stack = stackTrace;
            }
        }
        else if(isPresent(exception.originalStack))
        {
            stack = exception.originalStack;
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
            console.error(ExceptionHandler.exceptionToString(exception, stackTrace, reason));
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
export const REPORTING_EXCEPTION_HANDLER_PROVIDER = provide(ExceptionHandler,
                                                            {
                                                                useClass: ReportingExceptionHandler
                                                            });