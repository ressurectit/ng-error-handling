import {Injector} from '@angular/core';
import {Location} from '@angular/common';

import {AnglrExceptionExtender, ErrorWithStack, ErrorWithUrl} from '../../interfaces';

/**
 * Extends error with current application URL
 * @param injector - Injector used for obtaining dependencies
 * @param error - Error that should be extended
 */
export const errorWithUrlExtender: AnglrExceptionExtender = (injector: Injector, error: ErrorWithStack): Promise<ErrorWithStack> =>
{
    const errorWithUrl: ErrorWithStack & ErrorWithUrl = error;

    errorWithUrl.applicationUrl = injector.get(Location).path();

    return Promise.resolve(errorWithUrl);
};
