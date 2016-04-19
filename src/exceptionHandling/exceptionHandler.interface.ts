/**
 * Interface representing exception handler for js
 */
export interface IExceptionHandler 
{
    /**
     * Method called when exception occurs
     * @param  {any} exception Occured exception object
     * @param  {any} stackTrace? Stacktrace for occured exception
     * @param  {string} reason? Reason of exception
     */
    call(exception: any, stackTrace?: any, reason?: string): void;
}