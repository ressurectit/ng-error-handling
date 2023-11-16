import {Injector, PLATFORM_ID} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {ErrorWithStack, AnglrExceptionExtender, ErrorWithScreenShot} from '@anglr/error-handling';
import html2canvas from 'html2canvas';

/**
 * Extends error with screenshot of current application state
 * @param injector - Injector used for obtaining dependencies
 * @param error - Error that should be extended
 */
export const errorWithScreenShotExtender: AnglrExceptionExtender = async (injector: Injector, error: ErrorWithStack): Promise<ErrorWithStack> =>
{
    const errorWithScreenshot: ErrorWithStack & ErrorWithScreenShot = error;

    if(!isPlatformBrowser(injector.get(PLATFORM_ID)))
    {
        return errorWithScreenshot;
    }

    const document = injector.get(DOCUMENT);    
    const canvas = await html2canvas(document.body);

    errorWithScreenshot.screenshotBase64 = canvas.toDataURL().replace('data:image/png;base64,', '');

    return errorWithScreenshot;
};
