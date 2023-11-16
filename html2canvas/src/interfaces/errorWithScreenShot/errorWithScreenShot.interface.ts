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
