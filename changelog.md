# Changelog

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