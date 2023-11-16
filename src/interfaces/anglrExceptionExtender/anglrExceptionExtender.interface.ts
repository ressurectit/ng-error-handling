import {Injector} from '@angular/core';

import {ErrorWithStack} from '../errorWithStack/errorWithStack.interface';

/**
 * Definition of method that is used for extending error with additional data
 */
export interface AnglrExceptionExtender
{
    (injector: Injector, error: ErrorWithStack): Promise<ErrorWithStack>;
}
