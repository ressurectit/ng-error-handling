import {Injector, InjectionToken} from '@angular/core';

import {ErrorWithStack} from './errorWithStack';

/**
 * Definition of method that is used for extending error with additional data
 */
export interface AnglrExceptionExtender
{
    (injector: Injector, error: ErrorWithStack): Promise<ErrorWithStack>;
}

/**
 * Injection token used for injecting multiple AnglrExceptionExtender 
 */
export const ANGLR_EXCEPTION_EXTENDERS: InjectionToken<AnglrExceptionExtender[]> = new InjectionToken<AnglrExceptionExtender[]>('ANGLR_EXCEPTION_EXTENDERS');