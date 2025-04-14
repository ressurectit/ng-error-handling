import {SafeResourceUrl} from '@angular/platform-browser';

/**
 * Internal server error information
 */
export class InternalServerErrorInfo
{
    //######################### constructor #########################

    /**
     * Creates instance of `InternalServerErrorInfo`
     * @param id - Id of error
     * @param errorHtml - Html displaying info about error
     * @param requestUrl - Request url that was called and caused error
     */
    constructor(public id: number, public errorHtml: SafeResourceUrl, public requestUrl: string)
    {
    }
}
