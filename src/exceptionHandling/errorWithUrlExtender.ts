import {Injector, ValueProvider} from "@angular/core";
import {Location} from "@angular/common";

import {ErrorWithStack} from "./errorWithStack";
import {AnglrExceptionExtender, ErrorWithUrl, ANGLR_EXCEPTION_EXTENDERS} from "./anglrExceptionExtender";

/**
 * Extends error with current application URL
 * @param injector Injector used for obtaining dependencies
 * @param error Error that should be extended
 */
export const errorWithUrlExtender: AnglrExceptionExtender = (injector: Injector, error: ErrorWithStack): Promise<ErrorWithStack> =>
{
    let errorWithUrl: ErrorWithStack & ErrorWithUrl = error;

    errorWithUrl.applicationUrl = injector.get(Location).path();

    return Promise.resolve(errorWithUrl);
}

/**
 * Extender used for extending error with current application URL
 */
export const ERROR_WITH_URL_EXTENDER: ValueProvider =
{
    provide: ANGLR_EXCEPTION_EXTENDERS,
    useValue: errorWithUrlExtender,
    multi: true
};