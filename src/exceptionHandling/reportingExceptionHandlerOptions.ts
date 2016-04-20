import {isBlank} from 'angular2/src/facade/lang';

/**
 * Options that are used within ReportingExceptionHandler
 */
export class ReportingExceptionHandlerOptions
{
    //######################### public properties #########################

    /**
     * Indication that screenshot should be taken when error occurs
     */
    public captureScreenImage: boolean;

    /**
     * Indication that current html snapshot should be captured
     */
    public captureScreenHtml: boolean;

    /**
     * Indication that current html inputs state should be transformed into html
     */
    public captureHtmlInputs: boolean;

    /**
     * Indication whether should be server logging enabled or not
     */
    public enableServerLogging: boolean;
    
    /**
     * Indication whether should logger log errors also in browser console
     */
    public debugMode: boolean;

    //######################### constructor #########################

    /**
     * Creates instance of ReportingExceptionHandlerOptions
     * @param  {boolean} debugMode Indication whether should logger log errors also in browser console
     * @param  {boolean} captureScreenImage Indication that screenshot should be taken when error occurs
     * @param  {boolean} captureScreenHtml Indication that current html snapshot should be captured
     * @param  {boolean} captureHtmlInputs Indication that current html inputs state should be transformed into html
     * @param  {enableServerLogging} captureHtmlInputs Indication whether should be server logging enabled or not
     */
    constructor(debugMode?: boolean, captureScreenImage?: boolean, captureScreenHtml?: boolean, captureHtmlInputs?: boolean, enableServerLogging?: boolean)
    {
        if(isBlank(captureScreenHtml))
        {
            this.captureScreenHtml = true;
        }

        if(isBlank(captureScreenImage))
        {
            this.captureScreenImage = true;
        }

        if(isBlank(captureHtmlInputs))
        {
            this.captureHtmlInputs = true;
        }

        if(isBlank(enableServerLogging))
        {
            this.enableServerLogging = true;
        }
        
        if(isBlank(debugMode))
        {
            this.debugMode = false;
        }
    }
}