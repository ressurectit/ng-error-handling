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

/**
 * Error object extended with base64 string of current screenshot
 */
export interface ErrorWithScreenShot
{
    /**
     * Base64 of screenshot of application state
     */
    screenshotBase64?: string;
}

/**
 * Error object extended with current application URL
 */
export interface ErrorWithUrl
{
    /**
     * Url of application navigation
     */
    applicationUrl?: string;
}