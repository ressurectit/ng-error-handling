import {isPresent} from '@jscrpt/common';

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

    /**
     * Indication that also alert should show error message
     */
    public showAlsoAlert: boolean = false;

    //######################### constructor #########################

    /**
     * Creates instance of ReportingExceptionHandlerOptions
     * @param debugMode Indication whether should logger log errors also in browser console
     * @param showAlsoAlert Indication that also alert should show error message
     * @param captureScreenImage Indication that screenshot should be taken when error occurs
     * @param captureScreenHtml Indication that current html snapshot should be captured
     * @param captureHtmlInputs Indication that current html inputs state should be transformed into html
     * @param captureHtmlInputs Indication whether should be server logging enabled or not
     */
    constructor(debugMode?: boolean, showAlsoAlert?: boolean, captureScreenImage?: boolean, captureScreenHtml?: boolean, captureHtmlInputs?: boolean, enableServerLogging?: boolean)
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

        if(isPresent(showAlsoAlert))
        {
            this.showAlsoAlert = showAlsoAlert;
        }
    }
}