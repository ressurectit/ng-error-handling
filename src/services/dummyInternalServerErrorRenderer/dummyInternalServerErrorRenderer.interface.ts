import {InternalServerErrorRenderer} from '../../interfaces';
import {InternalServerErrorInfo} from '../../misc/classes/internalServerErrorInfo';

/**
 * Dummy renderer used for displaying/rendering internal server error
 */
export class DummyInternalServerErrorRenderer implements InternalServerErrorRenderer
{
    //######################### public methods - implementation of InternalServerErrorRenderer #########################

    /**
     * Displays pure response for internal server error 5xx error codes
     * @param errorInfo - Error info to be displayed
     * @param deleteCallback - Callback called when displayed error request removal of error
     */
    public show(_errorInfo: InternalServerErrorInfo, _deleteCallback: (errorInfo: InternalServerErrorInfo) => void): void
    {
    }
}
