import {ErrorWithStack} from './errorWithStack';

/**
 * Angular error containing also promise
 */
export interface AngularError extends ErrorWithStack
{
    promise?: Promise<any>;
    rejection?: ErrorWithStack;
}