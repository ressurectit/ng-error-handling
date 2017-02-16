import {isPresent} from '@anglr/common';

/**
 * Options that are used within ReportingExceptionHandler
 */
export class ReportingExceptionHandlerOptions
{
    //######################### public properties #########################

    /**
     * Indication that screenshot should be taken when error occurs
     */
    public captureScreenImage: boolean = true;

    /**
     * Indication that current html snapshot should be captured
     */
    public captureScreenHtml: boolean = true;

    /**
     * Indication that current html inputs state should be transformed into html
     */
    public captureHtmlInputs: boolean = true;

    /**
     * Indication whether should be server logging enabled or not
     */
    public enableServerLogging: boolean = true;
    
    /**
     * Indication whether should logger log errors also in browser console
     */
    public debugMode: boolean = false;

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
        if(isPresent(captureScreenHtml))
        {
            this.captureScreenHtml = captureScreenHtml;
        }

        if(isPresent(captureScreenImage))
        {
            this.captureScreenImage = captureScreenImage;
        }

        if(isPresent(captureHtmlInputs))
        {
            this.captureHtmlInputs = captureHtmlInputs;
        }

        if(isPresent(enableServerLogging))
        {
            this.enableServerLogging = enableServerLogging;
        }
        
        if(isPresent(debugMode))
        {
            this.debugMode = debugMode;
        }
    }
}