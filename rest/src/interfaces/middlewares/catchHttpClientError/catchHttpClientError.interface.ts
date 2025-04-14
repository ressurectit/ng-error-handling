import {CatchHttpClientErrorBehavior, HttpClientErrorConfigs, HttpClientErrorHandlers} from '@anglr/error-handling';

/**
 * Configuration that can be used within catch http client error middleware
 */
export interface RestCatchHttpClientError extends TypedPropertyDescriptor<unknown>
{
    /**
     * Behavior of catch http client error, default is `CatchHttpClientErrorBehavior.Suppress`
     */
    behavior: CatchHttpClientErrorBehavior|undefined|null;

    /**
     * Indication whether skip displaying of notifications for errors
     */
    skipErrorNotifications: boolean|undefined|null;

    /**
     * Indication whether skip server validation errors processing
     */
    skipServerValidationErrors: boolean|undefined|null;

    /**
     * Indication whether forcibly display custom message if present, not only as fallback but always
     */
    forceCustomMessageDisplay: boolean|undefined|null;

    /**
     * Object storing options/config for specific http status codes
     */
    configs: HttpClientErrorConfigs|undefined|null;

    /**
     * Object storing default error handlers for specific http status codes
     */
    handlers: HttpClientErrorHandlers|undefined|null;
}
