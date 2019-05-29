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
     * @param _exceptionMessage Message of occured exception
     * @param _exceptionStackTrace Stack trace to occured exception
     * @param _pageHtml Html of captured page state in time of exception
     * @param _pageScreenShotBase64 Screenshot of captured page in time of exception as of base64 string
     */
    public sendReport(_exceptionMessage: string, _exceptionStackTrace: string, _pageHtml: string, _pageScreenShotBase64: string)
    {
    }
}