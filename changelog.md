# Changelog

## Version 6.0.0-beta

- Angular IVY ready (APF compliant package)
- added support for ES2015 compilation

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