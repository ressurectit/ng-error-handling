import {CatchHttpClientErrorBehavior} from '../../misc/enums';

/**
 * Options for cattch http client errors specific for http status code
 */
export interface CatchHttpClientErrorHttpStatusCodeOptions
{
    /**
     * Behavior of catch http client error, default is `CatchHttpClientErrorBehavior.Suppress`
     */
    behavior?: CatchHttpClientErrorBehavior|null;

    /**
     * Indication whether skip displaying of notifications for errors
     */
    skipErrorNotifications?: boolean|null;

    /**
     * Indication whether skip server validation errors processing
     */
    skipServerValidationErrors?: boolean|null;

    /**
     * Indication whether forcibly display custom message if present, not only as fallback but always
     */
    forceCustomMessageDisplay?: boolean|null;

    /**
     * Object storing default messages to be displayed for specific http status codes
     */
    message?: string|null;
}
