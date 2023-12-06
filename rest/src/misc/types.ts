import {ClientValidationError, XXXHttpClientError, HttpClientErrorCustomHandler, RestClientError} from '@anglr/error-handling';
import {Func1} from '@jscrpt/common';

/**
 * Definition of http client error custom handler types
 */
export type HttpClientErrorCustomHandlerDef = HttpClientErrorCustomHandler|[HttpClientErrorCustomHandler, Func1<RestClientError, XXXHttpClientError>, Func1<ClientValidationError, XXXHttpClientError>?];