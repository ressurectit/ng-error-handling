import {ErrorWithStack} from '../errorWithStack/errorWithStack.interface';

/**
 * Angular error containing also promise
 */
export interface AngularError extends ErrorWithStack
{
    promise?: Promise<unknown>;
    rejection?: ErrorWithStack;
}