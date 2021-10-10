import {InternalServerErrorInfo} from '@anglr/error-handling';

/**
 * Description of data that are passed to dialog
 */
export interface DialogInternalServerErrorData
{
    /**
     * Error info to be displayed
     */
    errorInfo: InternalServerErrorInfo;

    /**
     * Callback called when displayed error request removal of error
     */
    deleteCallback: (errorInfo: InternalServerErrorInfo) => void;
}