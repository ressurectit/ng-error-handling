import {Injector, ValueProvider, PLATFORM_ID} from "@angular/core";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {ErrorWithStack, AnglrExceptionExtender, ErrorWithScreenShot, ANGLR_EXCEPTION_EXTENDERS} from "@anglr/error-handling";
import html2canvas from 'html2canvas';

/**
 * Extends error with screenshot of current application state
 * @param injector - Injector used for obtaining dependencies
 * @param error - Error that should be extended
 */
export const errorWithScreenShotExtender: AnglrExceptionExtender = (injector: Injector, error: ErrorWithStack): Promise<ErrorWithStack> =>
{
    let errorWithScreenshot: ErrorWithStack & ErrorWithScreenShot = error;

    if(!isPlatformBrowser(injector.get(PLATFORM_ID)))
    {
        return Promise.resolve(errorWithScreenshot);
    }

    let document = injector.get(DOCUMENT);    

    return new Promise(resolve =>
    {
        html2canvas(document.body).then(canvas => 
        {
            errorWithScreenshot.screenshotBase64 = canvas.toDataURL().replace("data:image/png;base64,", "");

            resolve(errorWithScreenshot);
        });
    });
}

/**
 * Extender used for extending error with screenshot of current application state
 */
export const ERROR_WITH_SCREENSHOT_EXTENDER: ValueProvider =
{
    provide: ANGLR_EXCEPTION_EXTENDERS,
    useValue: errorWithScreenShotExtender,
    multi: true
};