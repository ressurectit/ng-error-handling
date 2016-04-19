/**
 * Service that should be extended and is used for reporting
 */
export class ReportingExceptionHandlerService 
{
    //######################### constructor #########################
    constructor()
    {
    }
    
    //######################### public methods #########################
    
    /**
     * Sends report to server for loging purposes 
     * @param  {string} exceptionMessage Message of occured exception
     * @param  {string} exceptionStackTrace Stack trace to occured exception
     * @param  {string} pageHtml Html of captured page state in time of exception
     * @param  {string} pageScreenShotBase64 Screenshot of captured page in time of exception as of base64 string
     */
    public sendReport(exceptionMessage: string, exceptionStackTrace: string, pageHtml: string, pageScreenShotBase64: string)
    {
        throw new Error("This is default implementation which will not work. Please override this method.");
    }
}