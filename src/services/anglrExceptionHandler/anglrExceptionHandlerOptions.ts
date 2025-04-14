import {isPresent} from '@jscrpt/common';

/**
 * Options that are used within ReportingExceptionHandler
 */
export class AnglrExceptionHandlerOptions
{
    //######################### public properties #########################

    /**
     * Indication whether should log errors also in browser console
     */
    public debugMode: boolean = false;

    /**
     * Indication that also alert should show error message
     */
    public showAlsoAlert: boolean = false;

    //######################### constructor #########################

    /**
     * Creates instance of AnglrExceptionHandlerOptions
     * @param debugMode - Indication whether should logger log errors also in browser console
     * @param showAlsoAlert - Indication that also alert should show error message
     */
    constructor(debugMode?: boolean, showAlsoAlert?: boolean)
    {
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
