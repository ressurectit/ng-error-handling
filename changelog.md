# Changelog

## Version 13.0.0 (2023-12-06)

### Features

- new `provideAnglrExceptionExtenders` function, that provides anglr exception extends functions
- new `provideInternalServerErrorRenderer` function, that provides internal server error renderer type
- new `DummyInternalServerErrorRenderer` service, that is dummy renderer used for displaying/rendering internal server error
- new `handleHttpClientErrors` function, that handles http error response with code 400..499 and returns HttpClientError, otherwise returns original http error response
- new `catchHttpClientError` rxjs operator, that catches http client error response with code 400..499 and returns HttpClientError, otherwise returns original http error response
- new `ClientErrorOptions` interface, that represents options used for common handling of client errors
    - **properties**
        - `injector` injector used for obtaining dependencies
        - `clientErrorsResponseMapper` response mapper for http client errors
        - `clientValidationErrorsResponseMapper` response mapper for http client validation errors
- new `HttpClientError` class, that represents information about http client error (400..499)
    - **properties**
        - `errors` array of processed client errors
        - `validationErrors` object storing server valiation errors
        - `statusCode` http status code
        - `message` http error response message
        - `response` complete http error response object 
- new `HttpNotFoundError` class, that represents information about http not found error (404)
- updated `InternalServerErrorSAComponent` component
    - is now standalone
- *subpackage* `@anglr/error-handling/material`
    - updated `DialogInternalServerErrorSAComponent` component
        - is now standalone

### BREAKING CHANGES

- minimal supported version of `NodeJs` is `18`
- minimal supported version of `@angular` is `17.0.1`
- minimal supported version of `@angular` material is `17.0.0`
- minimal supported version of `@jscrpt/common` is `5.0.0`
- minimal supported version of `@anglr/common` is `19.0.0`
- minimal supported version of `@anglr/rest` is `14.0.0`
- minimal supported version of `tslib` is `2.6.2`
- removed `ERROR_WITH_URL_EXTENDER` provider, use `provideAnglrExceptionExtenders` to provide it
- removed `InternalServerErrorModule`, `InternalServerErrorSAComponent` is now standalone
- removed `ServerValidationsModule`, `ServerValidationValidatorSADirective` is now standalone
- renamed `InternalServerErrorComponent` to `InternalServerErrorSAComponent`
- *subpackage* `@anglr/error-handling/html2canvas`
    - removed `ERROR_WITH_SCREENSHOT_EXTENDER` provider, use `provideAnglrExceptionExtenders` to provide it
- *subpackage* `@anglr/error-handling/material`
    - removed `DIALOG_INTERNAL_SERVER_ERROR_RENDERER_PROVIDER` provider, use `provideInternalServerErrorRenderer` to provide it
    - removed `DialogInternalServerErrorModule`, `DialogInternalServerErrorSAComponent` is now standalone
    - renamed `DialogInternalServerErrorComponent` to `DialogInternalServerErrorSAComponent`

## Version 12.0.1 (2023-07-25)

### Bug Fixes

- fixed `HttpServerErrorInterceptor` imports, which points to itself

## Version 12.0.0 (2022-11-04)

### Bug Fixes

- fixed `Handle400WithValidations` decorator, now correctly registers custom handler for 400 http status code

### Features

- now also typings are available for external usage
- new `readErrorsFromHttpErrorResponse` function, that reads errors and validation errors from http error response
- new `HttpClientErrors` interface, which represents definition of http client errors read from http error response
    - **properties**
        - `errors` array of error
        - `validationErrors` object storing validation errors
- new `HttpClientError` interface, which represents http client error, containing extracted errors and original
    - **extends**
        - `HttpClientErrors`
    - **properties**
        - `httpResponse` original http error response
- new `handle4xxSuppress` rxjs operator, that handles http error response with code 400..499 as response and never returns
- new `handle404Suppress` rxjs operator, that handles 404 http code as response and never returns
- updated `handle404` rxjs operator function
    - new parameter `options` containing injector and mapper function for extraction of error messages
- *subpackage* `@anglr/error-handling/rest`
    - new `ClientErrorHandlingBehavior` enum, which represents behavior for client error handling
        - **values**
            - `Suppress` result of http request with client error is handled by handler but observable never finishes
            - `PassThrough` result of http request with client error is handled by handler and extracted errors passes through to observable
            - `PassThroughHttp` result of http request with client error is handled by handler and extracted errors passes through to observable with original http error
            - `RestClientError` result of http request with client error is handled by handler and observable returns instance of RestClientError or its descendants
    - new `ClientErrorHandlingOptions` class, which represents options for client error handling
        - **properties**
            - `behavior` behavior of client error handling
            - `defaultHandler` default error handler to be used if no other configured handler was found
            - `defaultClientError` default factory for obtaining RestClientError
            - `defaultClientValidationError` default factory for obtaining ClientValidationError
    - new `CLIENT_ERROR_HANDLING_MIDDLEWARE_OPTIONS` injection token for global client error handling middleware options
    - new `getDefaultClientErrorObservable` function which, gets observable for error according specified behavior
    - new `HttpClientErrorCustomHandlerDef` type, that represents definition of http client error custom handler types
    - new `ErrorPassThrough` decorator, which changes behavior of ClientErrorHandlingMiddleware to pass through errors
    - new `ErrorPassThroughHttp` decorator, which changes behavior of ClientErrorHandlingMiddleware to pass through errors and http error response
    - new `SuppressError` decorator, which changes behavior of ClientErrorHandlingMiddleware to suppress errors
    - new `WithRestClientError` decorator, which changes behavior of ClientErrorHandlingMiddleware to rest client error
    - new `getErrorHandlers` function, which gets error handler functions to be used for handling errors
    - updated `RestHttpClientErrors` interface
        - new **extends**
            - `Partial<ClientErrorHandlingMiddlewareOptions>`
    - updated `HTTP_CLIENT_ERROR_CUSTOM_HANDLER` injection token
        - now of type `HttpClientErrorCustomHandlerDef`

### BREAKING CHANGES

- minimal supported version of `rxjs` is `7.5.7`
- minimal supported version of `@jscrpt/common` is `3.3.0`
- minimal supported version of `@anglr/common` is `15.0.1`
- minimal supported version of `tslib` is `2.4.0`
- updated `Handle4xxOptions` interface
    - `injector` is now optional
- removed `HttpClientErrorInterceptor` http interceptor
- removed `HTTP_CLIENT_ERROR_INTERCEPTOR_PROVIDER` injection token
- removed `WithRestClientContext` class
- removed `resolveWithRestClientContext` function
- removed `Handle400WithValidationsOptions` interface, properties are now part of `Handle4xxOptions`
- renamed `ɵhandle4xxFunction` function to `handle4xxFunc`
- removed `handle4xxFunc` original function
- renamed `ɵHandle400WithValidationsFunction` function to `handle400WithValidationsFunc`
- removed `handle400WithValidationsFunc` original function
- moved `HTTP_IGNORED_CLIENT_ERRORS` into *subpackage* `@anglr/error-handling/rest`
- moved `HTTP_CLIENT_ERROR_CUSTOM_HANDLER` into *subpackage* `@anglr/error-handling/rest`
- updated `handle404Func` function
    - changed signature
- updated `HttpClientErrorCustomHandler` type
    - changed signature

## Version 11.0.0 (2022-06-08)

### Features

- new `ERROR_HANDLING_REST_MIDDLEWARES_ORDER` constant, that represents definition of array of rest middlewares order including error handling middleware
- new `middlewareTypes` type, that represents array of middleware names that are available in error-handling library
- new `REST_ERROR_HANDLING_MIDDLEWARE_ORDER` provider, that is provider for rest middleware order with error handling middleware
- updated `ClientErrorHandlingMiddleware` middleware, now middleware type has *static* `id` to correspond with `RestMiddlewareType<RestMiddleware>`

### BREAKING CHANGES

- minimal supported version of `@angular` is `14.0.0`
- minimal supported version of `@anglr/rest` is `12.0.0`
- minimal supported version of `@anglr/common` is `11.2.0`
- dropped support of `NodeJs` version `12`

## Version 10.0.0 (2022-04-08)

### Features

- **ERROR HANDLERS**
    - new `handle400WithValidationsFunc` function, that handles http error response with code 400 and process validations errors and returns RestClientError or RestClientValidationError
    - new `handle404Func` function, that handles http error response with code 404 and returns RestNotFoundError
    - new `handle4xxFunc` function, that handles http error response with code 400..499 and returns RestClientError
- **INTERCEPTORS**
    - new `HttpClientErrorInterceptor` *http interceptor*, that is used for handling http server errors with codes 400..499
    - new `HttpServerErrorInterceptor` *http interceptor*, that is used for handling http server errors with codes 500..599 and displaying of internal server error
    - new `HTTP_SERVER_ERROR_INTERCEPTOR_PROVIDER` provider for proper use of HttpServerErrorInterceptor, use this provider to inject this interceptor
    - new `HTTP_CLIENT_ERROR_INTERCEPTOR_PROVIDER` provider for proper use of HttpClientErrorInterceptor, use this provider to inject this interceptor
- new `HttpClientErrorResponseMapper` type, that represents response mapper for http client errors that are converted to array of error messages
- new `HttpClientValidationErrorResponseMapper` type, that represents response mapper for http client validation errors that are converted into object RestClientValidationErrors
- new `HttpClientErrorCustomHandler` type, that represents custom handler for `HttpErrorResponse`
- new `HttpClientPropertyValidationError` interface, that represents validation errors for single validated property
- new `HttpClientValidationErrors` interface, that represents object storing validations errors from server
- new `Handle4xxOptions` interface, that options passed for handle 4xx http status codes
    - property `injector` injector used for obtaining dependencies
    - property `clientErrorsResponseMapper` response mapper for http client errors
- new `Handle400WithValidationsOptions` interface, that represents options passed for handle 400 http status code with validations
    - extends `Handle4xxOptions`
    - property `clientValidationErrorsResponseMapper` response mapper for http client validation errors
- new `RestClientError` class, that represents handled client error 4xx http status code
- new `RestNotFoundError` class, that represents handled 404 http status code
- new `ClientValidationError` class, that represents handled 400 http status code with validations
- **SERVER VALIDATIONS**
    - `ServerValidationService` service
        - new `serverValidationProperties` property, that gets array of server validation properties
        - new `removeServerValidationError` method, that removes validation errors for single property
    - `ServerValidationValidatorDirective` directive
        - now also tries to get property name from `FormControlNameDirective`
        - now uses new `HttpClientValidationErrors`, which allows multiple server validations errors to be set
        - new `propertyName` property, that is name of server property that is being validated by this
- **RXJS OPERATORS**
    - new `handle400WithValidations` operator, that handles 400 http code with validations as response
    - new `handle404` operator, that handles 404 http code as response
    - new `handle4xx` operator, that handles http error response with code 400..499 as response
- new *subpackage* `@anglr/error-handling/rest`
- *subpackage* `@anglr/error-handling/rest`
    - requires `@anglr/rest` minimal version `11.0.1`
    - **DECORATORS**
        - new `Handle404` decorator, that handles 404 response http code
        - new `IgnoreClientErrors` decorator, that adds ignored client error http codes for client error handling middleware
        - new `Handle400WithValidations` decorator, that handles 400 http code with validations
    - **MIDDLEWARES**
        - new `ClientErrorHandlingMiddleware` middleware, that is used for handling 4xx errors
    - new `RestHttpClientErrors` interface, that contains metadata for http client errors configuration
        - property `addIgnoredClientErrors` array of ignored client errors that will be added to default ones
        - property `clientErrorResponseMapper` response mapper for client errors
        - property `customErrorHandlers` custom error handlers for specific http status codes
    - new `WithRestClientContext` class, that allows resolving your data with RESTClient context
    - new `resolveWithRestClientContext` function, that resolves with rest client context into result

### BREAKING CHANGES

- removed `BadRequestDetail`
- removed `HTTP_ERROR_INTERCEPTOR_PROVIDER` replaced by `HTTP_SERVER_ERROR_INTERCEPTOR_PROVIDER` and `HTTP_CLIENT_ERROR_INTERCEPTOR_PROVIDER`
    - `HTTP_CLIENT_ERROR_INTERCEPTOR_PROVIDER` should not be used, use `ClientErrorHandlingMiddleware` instead
- removed `ResponseMapperFunction`
- removed `ERROR_RESPONSE_MAP_PROVIDER`
- removed `HttpErrorInterceptor` replaced by `HttpClientErrorInterceptor` and `HttpServerErrorInterceptor`
    - `HttpClientErrorInterceptor` should not be used, use `ClientErrorHandlingMiddleware` instead
- removed `HttpErrorInterceptorOptions`
- updated `ServerValidationService` class `serverValidations` property, has new type `HttpClientValidationErrors`
- updated `ServerValidationService` class `addServerValidationErrors` method, has new parameter type `HttpClientValidationErrors`
- removed `SERVER_VALIDATIONS` constant

## Version 9.0.2 (2022-02-22)

### Bug Fixes

- fixed missing `material` entry point

## Version 9.0.1 (2022-02-22)

### Bug Fixes

- fixed typings, not using rolled up typings for now

## Version 9.0.0 (2022-02-16)

### BREAKING CHANGES

- minimal supported version of *Angular* is `13.1.0`
- minimal supported version of `@jscrpt/common` is `2.2.0`
- minimal supported version of `@anglr/common` is `10.0.0`
- compiled as *Angular IVY* **only** with new *APF*
- removed support of *es5* target and using latest package.json features
- removed dependency `@anglr/types`, all mising types used directly here
- dropped support of `Node.js <= 12.20`
- `HttpGatewayTimeoutInterceptorOptions` class
    - `text`, `action` are now non nullable
- `NoConnectionInterceptorOptions` class
    - `text`, `action` are now non nullable
- `ServiceUnavailableInterceptorOptions` class
    - `text`, `action` are now non nullable
- `InternalServerErrorInfo` class
    - added constructor with initialization
- `ServerValidationMessagesComponent` removed, server validations are injected into control errors

## Version 8.0.0 (2022-02-16)

### Bug Fixes

- fixed `HttpErrorInterceptor`, now can be correctly *disabled* using `IgnoredInterceptorsService`

### Features

- added `Logger` into `HttpErrorInterceptor`
- new `AnglrExceptionExtender` that allows extending error with custom data
- new `AnglrExceptionHandler` used as `ErrorHandler`
    - now using also `Logger` for logging errors
    - now using `AnglrExceptionExtender` to add additional data to *error*
- new `InternalServerErrorRenderer` interface used as definition for renderer that displays *internal server error*
- new `INTERNAL_SERVER_ERROR_RENDERER` injection token that allows injecting of implementation `InternalServerErrorRenderer`, defaults to *dummy* implementation
- `InternalServerErrorComponent` with bit changed design
- added new `errorWithUrlExtender` that implements `AnglrExceptionExtender` and adding (application url) data to error defined in `ErrorWithUrl`
- added new `ERROR_WITH_URL_EXTENDER` provider used for providing `errorWithUrlExtender`
- new `ERROR_HANDLING_NOTIFICATIONS` injection token used for injecting notifications service used withing error handling package
- refactored `ServerValidationValidatorDirective`, which nows also subscribes for changes of `ServerValidationService`
- new *subpackage* `@anglr/select/html2canvas`
- *subpackage* `@anglr/select/html2canvas`
    - added new `errorWithScreenShotExtender` that implements `AnglrExceptionExtender` and adding (screenshot) data to error defined in `ErrorWithScreenShot`
    - added new `ERROR_WITH_SCREENSHOT_EXTENDER` provider used for providing `errorWithScreenShotExtender`
- new *subpackage* `@anglr/select/material`
- *subpackage* `@anglr/select/material`
    - added new `DialogInternalServerErrorRenderer` as implementation of `InternalServerErrorRenderer` which displays internal server error in *material dialog*
    - added new `DIALOG_INTERNAL_SERVER_ERROR_RENDERER_PROVIDER` which is provider for `DialogInternalServerErrorRenderer` as `INTERNAL_SERVER_ERROR_RENDERER`
    - added new `DialogInternalServerErrorComponent` that displays information about internal server error in iframe, used withing *material dialog*
        - `DialogInternalServerErrorData` interface used for passing data into component

### BREAKING CHANGES

- minimal supported version of *Angular* is `12.0.0`
- minimal supported version of `@jscrpt/common` is `1.2.0`
- minimal supported version of `@anglr/common` is `9.0.0`
- removed `jquery` as dependency
- removed `ReportingExceptionHandlerService`, now should be implemented as custom logger *sink*
- renamed `ReportingExceptionHandlerOptions` to `AnglrExceptionHandlerOptions`
    - dropped `captureScreenImage` option
    - dropped `captureScreenHtml` option
    - dropped `captureHtmlInputs` option
    - dropped `enableServerLogging` option
- renamed `ReportingExceptionHandler` to `AnglrExceptionHandler`
    - html and image capturing now should be done using `AnglrExceptionExtender`
- `html2canvas` is now as dependency of new submodule
- added dependency on `@angular/material` and `@angular/cdk`
- `InternalServerErrorComponent` is now using `InternalServerErrorRenderer` implementation for displaying internal server error and not displaying error directly
- removed `WithServerValidationsDirective`, new improved `ServerValidationValidatorDirective` will cover its functionality
- changed constructor parameters for `ServerValidationValidatorDirective`
- `GlobalNotificationsService` replaced with `Notifications` from `@anglr/common` package, using `ERROR_HANDLING_NOTIFICATIONS` `InjectionToken`

## Version 7.0.1

- changed way of loading `html2canvas`, enables using of lib in environments without `document`

## Version 7.0.0

- updated to latest stable *Angular* 9
- added generating of API doc

## Version 6.0.0

- Angular IVY ready (APF compliant package)
- added support for ES2015 compilation
- Angular 8

## Version 5.0.3
 - fixed `ReportingExceptionHandler` when obtaining stack, if stack was not defined

## Version 5.0.2
 - added `ServiceUnavailableInterceptor` and `ServiceUnavailableInterceptorOptions` for handling 503 http status code
 - updated `NoConnectionInterceptorOptions` default `text` property value

## Version 5.0.1
 - added `HttpGatewayTimeoutInterceptor` and `HttpGatewayTimeoutInterceptorOptions` for handling 504 http status code
 - added `NoConnectionInterceptor` and `NoConnectionInterceptorOptions` for handling 0 http status code
 - updated `InternalServerErrorService` that should correctly serialize non `string` internal server error responses

## Version 5.0.0
 - stabilized for angular v6

## Version 5.0.0-beta.2
 - `@anglr/error-handling` is now marked as *sideEffects* free
 - removed `forRoot` methods from `ServerValidationsModule`
 - removed `forRoot` methods from `InternalServerErrorModule`
 - removed `ExceptionHandlingModule`
 - removed `HttpErrorInterceptorModule`
 - service `ServerValidationService` is made *tree-shakeable*
 - service `InternalServerErrorService` is made *tree-shakeable*
 - provider `REPORTING_EXCEPTION_HANDLER_PROVIDER` must be provided explicitly
 - provider `HTTP_ERROR_INTERCEPTOR_PROVIDER` must be provided explicitly
 - provider `ERROR_RESPONSE_MAP_PROVIDER` must be provided explicitly
 - service `ReportingExceptionHandlerService` must be provided explicitly
 - options factory `ReportingExceptionHandlerOptions` must be provided explicitly
 - options factory `HttpErrorInterceptorOptions` must be provided explicitly
 - *sourceMap* library should be ignored during SSR

## Version 5.0.0-beta.1
 - aktualizácia balíčkov `Angular` na `6`
 - aktualizácia `Webpack` na verziu `4`
 - aktualizácia `rxjs` na verziu `6`
 - automatické generovanie dokumentácie

## Version 4.0.4

- removed console.log from default `ReportingExceptionHandlerService`

## Version 4.0.3

- returned typescript version back to 2.4.2 and removed distJit

## Version 4.0.2

- added compiled outputs for Angular JIT

## Version 4.0.1

- fixed rxjs operators, now using pipe

## Version 4.0.0

- updated angular to 5.0.0 (final)
- changed dependencies of project to peerDependencies
- more strict compilation
- updated usage of rxjs, now using operators

## Version 4.0.0-beta.1

- updated angular to >=5.0.0-rc.7

## Version 4.0.0-beta.0

- removed dependency form `@anglr/http-extensions`
- removed dependency from `@angular/http`
- `HttpErrorInterceptor` now using `HttpClient`