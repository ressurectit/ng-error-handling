import {InternalServerErrorInfo} from '../../misc/classes/internalServerErrorInfo';

/**
 * Renderer used for displaying/rendering internal server error
 */
export interface InternalServerErrorRenderer
{
    /**
     * Displays pure response for internal server error 5xx error codes
     * @param errorInfo - Error info to be displayed
     * @param deleteCallback - Callback called when displayed error request removal of error
     */
    show(errorInfo: InternalServerErrorInfo, deleteCallback: (errorInfo: InternalServerErrorInfo) => void): void;
}
