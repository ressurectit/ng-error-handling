[![npm version](https://badge.fury.io/js/%40anglr%2Ferror-handling.svg)](https://badge.fury.io/js/%40anglr%2Ferror-handling)
[![Build status](https://ci.appveyor.com/api/projects/status/8lh515soae5e68x8?svg=true)](https://ci.appveyor.com/project/kukjevov/ng-error-handling)

# @anglr/error-handling

Comprehensive Angular library for HTTP error handling, providing a unified approach to managing client errors (4xx), server errors (5xx), connection issues, and form validation errors in Angular applications. The library integrates with Angular's dependency injection, HTTP interceptors, RxJS operators, and reactive forms to deliver a complete error-handling solution.

## Table of contents

- [Installation](#installation)
- [Packages](#packages)
- [Getting started](#getting-started)
- [Global exception handler](#global-exception-handler)
- [HTTP interceptors](#http-interceptors)
- [RxJS operators](#rxjs-operators)
- [Server validation](#server-validation)
- [Internal server error display](#internal-server-error-display)
- [Exception extenders](#exception-extenders)
- [Injection tokens](#injection-tokens)
- [Provider functions](#provider-functions)
- [Sub-packages](#sub-packages)
  - [@anglr/error-handling/rest](#anglrerror-handlingrest)
  - [@anglr/error-handling/material](#anglrerror-handlingmaterial)
  - [@anglr/error-handling/html2canvas](#anglrerror-handlinghtml2canvas)
- [API reference](#api-reference)
- [License](#license)

## Installation

Install the core package via npm:

```bash
npm install @anglr/error-handling --save
```

### Peer dependencies

The library requires the following peer dependencies:

- `@angular/core` >= 20.3.2
- `@angular/common` >= 20.3.2
- `@angular/forms` >= 20.3.2
- `@angular/platform-browser` >= 20.3.2
- `@anglr/common` >= 23.0.0
- `@jscrpt/common` >= 7.0.0
- `rxjs` >= 7.5.7

### Optional sub-packages

```bash
# Angular Material dialog renderer for internal server errors
npm install @angular/material @angular/cdk --save

# Screenshot capture on error (browser only)
npm install html2canvas --save

# Integration with @anglr/rest
npm install @anglr/rest --save
```

## Packages

The library is organized into multiple entry points:

| Entry point | Description |
|---|---|
| `@anglr/error-handling` | Core error handling (interceptors, operators, services, components) |
| `@anglr/error-handling/rest` | `@anglr/rest` integration (decorators and middlewares) |
| `@anglr/error-handling/material` | Angular Material dialog renderer for internal server errors |
| `@anglr/error-handling/html2canvas` | Screenshot capture extender using `html2canvas` |

## Getting started

### Basic setup

Configure global error handling in your application configuration:

```typescript
import {ApplicationConfig} from '@angular/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ANGLR_EXCEPTION_HANDLER_PROVIDER, httpServerErrorInterceptor, noConnectionInterceptor, serviceUnavailableInterceptor, httpGatewayTimeoutInterceptor, provideAnglrExceptionExtenders, errorWithUrlExtender} from '@anglr/error-handling';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        ANGLR_EXCEPTION_HANDLER_PROVIDER,
        provideHttpClient(withInterceptors(
        [
            noConnectionInterceptor,
            serviceUnavailableInterceptor,
            httpGatewayTimeoutInterceptor,
            httpServerErrorInterceptor,
        ])),
        provideAnglrExceptionExtenders(
        [
            errorWithUrlExtender,
        ]),
    ],
};
```

### Providing notifications

The library uses injection tokens for notification services. You need to provide your own `Notifications` implementation from `@anglr/common`:

```typescript
import {ApplicationConfig} from '@angular/core';
import {ERROR_HANDLING_NOTIFICATIONS, CLIENT_ERROR_NOTIFICATIONS} from '@anglr/error-handling';
import {GlobalNotificationsService} from '@anglr/common';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        {
            provide: ERROR_HANDLING_NOTIFICATIONS,
            useExisting: GlobalNotificationsService,
        },
        {
            provide: CLIENT_ERROR_NOTIFICATIONS,
            useExisting: GlobalNotificationsService,
        },
    ],
};
```

## Global exception handler

`AnglrExceptionHandler` replaces Angular's default `ErrorHandler` and provides enhanced unhandled error handling including source map resolution, notifications, and extensibility through extenders.

### Registration

```typescript
import {ANGLR_EXCEPTION_HANDLER_PROVIDER, AnglrExceptionHandlerOptions} from '@anglr/error-handling';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        ANGLR_EXCEPTION_HANDLER_PROVIDER,
        new AnglrExceptionHandlerOptions(true, false),
    ],
};
```

### Options

The `AnglrExceptionHandlerOptions` class accepts:

| Parameter | Type | Default | Description |
|---|---|---|---|
| `debugMode` | `boolean` | `false` | Logs errors to browser console with full stack traces |
| `showAlsoAlert` | `boolean` | `false` | Shows browser `alert()` with error message (debug only) |

### How it works

1. Captures unhandled errors via Angular's `ErrorHandler` interface
2. Resolves source-mapped stack traces (browser only, via `sourcemapped-stacktrace`)
3. Sends error notifications through `ERROR_HANDLING_NOTIFICATIONS`
4. Runs all registered `AnglrExceptionExtender` functions to enrich the error
5. Logs the enriched error via `LOGGER` from `@anglr/common`

## HTTP interceptors

All interceptors are available both as functional interceptors (recommended) and as class-based providers (deprecated).

### `noConnectionInterceptor`

Handles HTTP responses with status `0` (server offline / no connection).

```typescript
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {noConnectionInterceptor, NoConnectionInterceptorOptions} from '@anglr/error-handling';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        provideHttpClient(withInterceptors(
        [
            noConnectionInterceptor,
        ])),
        new NoConnectionInterceptorOptions('Custom offline message.'),
    ],
};
```

Default message: `'Server is offline. Try again later.'`

### `serviceUnavailableInterceptor`

Handles HTTP `503 Service Unavailable` responses.

```typescript
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {serviceUnavailableInterceptor, ServiceUnavailableInterceptorOptions} from '@anglr/error-handling';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        provideHttpClient(withInterceptors(
        [
            serviceUnavailableInterceptor,
        ])),
        new ServiceUnavailableInterceptorOptions('Service is temporarily unavailable.'),
    ],
};
```

Default message: `'Remote server is unavailable. Try again later.'`

### `httpGatewayTimeoutInterceptor`

Handles HTTP `504 Gateway Timeout` responses.

```typescript
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {httpGatewayTimeoutInterceptor, HttpGatewayTimeoutInterceptorOptions} from '@anglr/error-handling';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        provideHttpClient(withInterceptors(
        [
            httpGatewayTimeoutInterceptor,
        ])),
        new HttpGatewayTimeoutInterceptorOptions('Gateway timeout occurred.'),
    ],
};
```

Default message: `'Server did not respond in defined time.'`

### `httpServerErrorInterceptor`

Handles HTTP `5xx` server errors. In dev mode (`jsDevMode`), logs errors and optionally renders error details through `InternalServerErrorService`.

```typescript
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {httpServerErrorInterceptor} from '@anglr/error-handling';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        provideHttpClient(withInterceptors(
        [
            httpServerErrorInterceptor,
        ])),
    ],
};
```

## RxJS operators

### `processHttpClientErrorResponse`

Converts `HttpErrorResponse` with status codes `400..499` into `HttpClientError` objects. Non-HTTP errors and client-side errors are re-thrown unchanged.

```typescript
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {processHttpClientErrorResponse, catchHttpClientError} from '@anglr/error-handling';

@Injectable({providedIn: 'root'})
export class UserService
{
    private _httpClient: HttpClient = inject(HttpClient);

    public getUser(id: number)
    {
        return this._httpClient.get(`/api/users/${id}`)
            .pipe(
                processHttpClientErrorResponse(),
                catchHttpClientError(),
            );
    }
}
```

#### Options

```typescript
import {processHttpClientErrorResponse} from '@anglr/error-handling';

// With custom options
processHttpClientErrorResponse(
{
    injector: myInjector,
    ignoredHttpStatusCodes: [401, 403, 409],
    clientErrorsResponseMapper: err => [err?.error?.message ?? 'Unknown error'],
    clientValidationErrorsResponseMapper: err => err?.error?.validationErrors ?? null,
});
```

### `catchHttpClientError`

Catches `HttpClientError` objects (produced by `processHttpClientErrorResponse`) and handles them according to provided options — displaying notifications, storing validation errors, and applying behavior.

```typescript
import {CatchHttpClientErrorBehavior, catchHttpClientError} from '@anglr/error-handling';

// Suppress errors (default) — observable never completes on error
catchHttpClientError();

// Pass through — HttpClientError is emitted as next value
catchHttpClientError({behavior: CatchHttpClientErrorBehavior.PassThrogh});

// Throw — HttpClientError is re-thrown as observable error
catchHttpClientError({behavior: CatchHttpClientErrorBehavior.Throw});
```

#### Per-status-code configuration

```typescript
import {CatchHttpClientErrorBehavior, catchHttpClientError} from '@anglr/error-handling';

catchHttpClientError(
{
    configs:
    {
        404:
        {
            behavior: CatchHttpClientErrorBehavior.Throw,
            message: 'Resource not found',
            skipErrorNotifications: false,
            skipServerValidationErrors: true,
            forceCustomMessageDisplay: true,
        },
        409:
        {
            behavior: CatchHttpClientErrorBehavior.PassThrogh,
            message: 'Conflict occurred',
        },
    },
});
```

#### Custom error handlers

```typescript
import {catchHttpClientError, HttpClientError} from '@anglr/error-handling';

catchHttpClientError(
{
    handlers:
    {
        404: async (error: HttpClientError) =>
        {
            console.log('Custom 404 handler', error.response.url);

            return null;
        },
    },
});
```

### `CatchHttpClientErrorBehavior`

Enum controlling what happens after an HTTP client error is processed:

| Value | Description |
|---|---|
| `Suppress` | Error is handled silently, observable never completes (default) |
| `PassThrogh` | `HttpClientError` is emitted as the next observable value |
| `Throw` | `HttpClientError` is re-thrown as an observable error |

## Server validation

### `ServerValidationService`

Root-provided service for managing server-side validation errors. It stores validation errors received from HTTP responses and notifies subscribers when they change.

```typescript
import {inject} from '@angular/core';
import {ServerValidationService} from '@anglr/error-handling';

@Injectable({providedIn: 'root'})
export class MyFormService
{
    private _serverValidation: ServerValidationService = inject(ServerValidationService);

    public submitForm(data: unknown)
    {
        // Clear previous validation errors before submission
        this._serverValidation.clearServerValidationErrors();
        // ... perform HTTP request
    }
}
```

### `ServerValidationValidatorDirective`

Directive that integrates server-side validation errors with Angular reactive forms. Apply the `serverValidation` attribute to form controls to automatically display server validation errors.

```html
<form>
    <input formControlName="email"
           serverValidation />

    <input formControlName="username"
           serverValidation="userName" />
</form>
```

- When `serverValidation` is used without a value on a `formControlName` element, the `formControlName` value is used as the server validation property name
- When a value is provided (e.g., `serverValidation="userName"`), that value is used instead

The directive automatically revalidates the form control when server validation errors change.

## Internal server error display

### `InternalServerErrorComponent`

Component that subscribes to `InternalServerErrorService` and collects internal server error reports for display.

```html
<internal-server-error />
```

Place this component in your root application template. It listens for `5xx` error events (triggered by `httpServerErrorInterceptor`) and renders them using the configured `InternalServerErrorRenderer`.

### `InternalServerErrorRenderer`

Interface for customizing how internal server errors are displayed:

```typescript
import {InternalServerErrorInfo, InternalServerErrorRenderer} from '@anglr/error-handling';

export class CustomErrorRenderer implements InternalServerErrorRenderer
{
    public show(errorInfo: InternalServerErrorInfo, deleteCallback: (errorInfo: InternalServerErrorInfo) => void): void
    {
        // Custom rendering logic
        console.log('Server error:', errorInfo.errorHtml, errorInfo.requestUrl);
        deleteCallback(errorInfo);
    }
}
```

Register using the provider function:

```typescript
import {provideInternalServerErrorRenderer} from '@anglr/error-handling';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        provideInternalServerErrorRenderer(CustomErrorRenderer),
    ],
};
```

## Exception extenders

Exception extenders enrich error objects with additional context before they are logged. They implement the `AnglrExceptionExtender` type:

```typescript
type AnglrExceptionExtender = (injector: Injector, error: ErrorWithStack) => Promise<ErrorWithStack>;
```

### Built-in extenders

#### `errorWithUrlExtender`

Adds the current application URL (via Angular's `Location` service) to the error object.

```typescript
import {provideAnglrExceptionExtenders, errorWithUrlExtender} from '@anglr/error-handling';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        provideAnglrExceptionExtenders(
        [
            errorWithUrlExtender,
        ]),
    ],
};
```

### Custom extenders

```typescript
import {Injector} from '@angular/core';
import {AnglrExceptionExtender, ErrorWithStack} from '@anglr/error-handling';

export const errorWithTimestampExtender: AnglrExceptionExtender = (injector: Injector, error: ErrorWithStack): Promise<ErrorWithStack> =>
{
    const extended = error as ErrorWithStack & {timestamp: string};
    extended.timestamp = new Date().toISOString();

    return Promise.resolve(extended);
};

// Register
provideAnglrExceptionExtenders(
[
    errorWithUrlExtender,
    errorWithTimestampExtender,
]);
```

## Injection tokens

| Token | Type | Default | Description |
|---|---|---|---|
| `ERROR_HANDLING_NOTIFICATIONS` | `Notifications` | — | Notifications service for error handling package |
| `CLIENT_ERROR_NOTIFICATIONS` | `Notifications` | — | Notifications service for HTTP client error display |
| `HTTP_CLIENT_ERROR_RESPONSE_MAPPER` | `HttpClientErrorResponseMapper` | `err => [err?.error?.toString()]` | Maps `HttpErrorResponse` to error messages |
| `HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER` | `HttpClientValidationErrorResponseMapper` | — | Maps `HttpErrorResponse` to validation errors |
| `ANGLR_EXCEPTION_EXTENDERS` | `AnglrExceptionExtender[]` | `[]` | Multi-token for exception extender functions |
| `INTERNAL_SERVER_ERROR_RENDERER` | `InternalServerErrorRenderer` | `DummyInternalServerErrorRenderer` | Renderer for internal server error display |
| `HTTP_IGNORED_CLIENT_ERRORS` | `number[]` | `[401, 403]` | HTTP status codes ignored by error processing |
| `HTTP_CLIENT_ERROR_CONFIGS` | `HttpClientErrorConfigs` | — | Per-status-code configuration for error handling |
| `HTTP_CLIENT_ERROR_HANDLERS` | `HttpClientErrorHandlers` | — | Per-status-code custom error handlers |

## Provider functions

| Function | Description |
|---|---|
| `provideAnglrExceptionExtenders(extenders)` | Registers exception extender functions |
| `provideInternalServerErrorRenderer(renderer)` | Registers custom internal server error renderer |
| `provideHttpClientErrorConfigs(configs)` | Provides and merges per-status error configs |
| `provideHttpClientErrorHandlers(handlers)` | Provides and merges per-status error handlers |
| `provideHttpClientErrorResponseMapper(mapper)` | Provides custom error response mapper |
| `provideHttpClientValidationErrorResponseMapper(mapper)` | Provides custom validation error response mapper |

## Sub-packages

### `@anglr/error-handling/rest`

Integration with `@anglr/rest` library, providing decorators and middlewares for declarative REST client error handling.

#### Middlewares

- **`CatchHttpClientErrorMiddleware`** — wraps REST method responses with `catchHttpClientError` operator
- **`HttpClientErrorProcessingMiddleware`** — wraps REST method responses with `processHttpClientErrorResponse` operator

#### Decorators

All decorators modify REST method descriptors and are used on `@anglr/rest` service methods:

```typescript
import {RESTClient, GET, BaseUrl} from '@anglr/rest';
import {HttpClientErrorBehavior, HttpClientErrorMessages, HttpClientErrorSkipErrorNotifications, IgnoredHttpErrorStatusCodes} from '@anglr/error-handling/rest';
import {CatchHttpClientErrorBehavior} from '@anglr/error-handling';

@Injectable({providedIn: 'root'})
@BaseUrl('/api')
export class UsersRestService extends RESTClient
{
    @GET('/users/{id}')
    @HttpClientErrorBehavior(CatchHttpClientErrorBehavior.Throw)
    @HttpClientErrorMessages({404: 'User not found'})
    public getUser(@Path('id') id: number): Observable<User>
    {
        return undefined;
    }

    @GET('/users')
    @HttpClientErrorBehavior(CatchHttpClientErrorBehavior.Suppress, 404)
    @HttpClientErrorSkipErrorNotifications()
    @IgnoredHttpErrorStatusCodes([409])
    public getUsers(): Observable<User[]>
    {
        return undefined;
    }
}
```

| Decorator | Description |
|---|---|
| `@HttpClientErrorBehavior(behavior, statusCode?)` | Sets error behavior globally or per status code |
| `@HttpClientErrorMessages(messages)` | Sets custom error messages per status code |
| `@HttpClientErrorHandlers(handlers)` | Sets custom error handlers per status code |
| `@HttpClientErrorForceCustomMessage(indication?, statusCode?)` | Forces custom message display |
| `@HttpClientErrorSkipErrorNotifications(indication?, statusCode?)` | Skips error notification display |
| `@HttpClientErrorSkipServerValidationErrors(indication?, statusCode?)` | Skips server validation error processing |
| `@HttpClientErrorsMapper(mapper)` | Sets custom error response mapper |
| `@HttpClientValidationErrorsMapper(mapper)` | Sets custom validation error response mapper |
| `@IgnoredHttpErrorStatusCodes(statusCodes)` | Sets ignored HTTP status codes |

### `@anglr/error-handling/material`

Provides Angular Material–based renderer for internal server errors using `MatDialog`.

#### Setup

```typescript
import {provideInternalServerErrorRenderer} from '@anglr/error-handling';
import {DialogInternalServerErrorRenderer} from '@anglr/error-handling/material';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        provideInternalServerErrorRenderer(DialogInternalServerErrorRenderer),
    ],
};
```

The `DialogInternalServerErrorRenderer` opens a `MatDialog` at `90vw × 90vh` displaying the full server error response HTML.

### `@anglr/error-handling/html2canvas`

Provides an exception extender that captures a screenshot of the current application state when an error occurs (browser only).

#### Setup

```typescript
import {provideAnglrExceptionExtenders, errorWithUrlExtender} from '@anglr/error-handling';
import {errorWithScreenShotExtender} from '@anglr/error-handling/html2canvas';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        provideAnglrExceptionExtenders(
        [
            errorWithUrlExtender,
            errorWithScreenShotExtender,
        ]),
    ],
};
```

The `errorWithScreenShotExtender` uses `html2canvas` to render `document.body` as a PNG and attaches the base64-encoded image to the error object as `screenshotBase64`.

## API reference

### Classes

| Class | Description |
|---|---|
| `HttpClientError` | Normalized wrapper for HTTP 4xx errors with `errors`, `validationErrors`, `statusCode`, `message`, `response` |
| `HttpNotFoundError` | Specialized `HttpClientError` for HTTP 404 responses |
| `InternalServerErrorInfo` | Model for internal server error display with `id`, `errorHtml`, `requestUrl` |
| `AnglrExceptionHandlerOptions` | Configuration options for the global exception handler |
| `NoConnectionInterceptorOptions` | Configuration for `noConnectionInterceptor` |
| `ServiceUnavailableInterceptorOptions` | Configuration for `serviceUnavailableInterceptor` |
| `HttpGatewayTimeoutInterceptorOptions` | Configuration for `httpGatewayTimeoutInterceptor` |

### Services

| Service | Provided in | Description |
|---|---|---|
| `AnglrExceptionHandler` | via `ANGLR_EXCEPTION_HANDLER_PROVIDER` | Global exception handler with source map support |
| `InternalServerErrorService` | `root` | Emits internal server error events for display |
| `ServerValidationService` | `root` | Manages server-side validation errors |
| `DummyInternalServerErrorRenderer` | `root` (default) | No-op fallback renderer for internal server errors |

### Interfaces

| Interface | Description |
|---|---|
| `AnglrExceptionExtender` | Async function signature for extending error objects |
| `AngularError` | Angular error shape with optional `promise` and `rejection` |
| `CatchHttpClientErrorOptions` | Options for `catchHttpClientError` operator |
| `CatchHttpClientErrorHttpStatusCodeOptions` | Per-status-code config (`behavior`, `message`, notification/validation skipping) |
| `ErrorWithStack` | Error with optional `stack` property |
| `ErrorWithUrl` | Extends error with optional `applicationUrl` |
| `HttpClientErrorHandler` | Async handler returning processed error or `null` |
| `HttpClientErrorOptions` | Options for `processHttpClientErrorResponse` operator |
| `HttpClientErrors` | Combined `{errors, validationErrors}` result |
| `HttpClientPropertyValidationError` | Map of validation error keys to messages |
| `HttpClientValidationErrors` | Property name to validation error map |
| `InternalServerErrorRenderer` | Contract for rendering internal server errors |

### Types

| Type | Description |
|---|---|
| `HttpClientErrorResponseMapper` | `(err: HttpErrorResponse) => PromiseOr<string[]>` |
| `HttpClientValidationErrorResponseMapper` | `(err: HttpErrorResponse) => PromiseOr<HttpClientValidationErrors\|null>` |
| `HttpClientErrorMessages` | `Record<number, string\|undefined\|null>` |
| `HttpClientErrorConfigs` | `Record<number, CatchHttpClientErrorHttpStatusCodeOptions\|undefined\|null>` |
| `HttpClientErrorHandlers` | `Record<number, HttpClientErrorHandler<HttpClientError>\|undefined\|null>` |

## License

[MIT](./LICENSE)

