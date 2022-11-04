import {ClientValidationError, HttpClientError, HttpClientErrorCustomHandler, RestClientError} from '@anglr/error-handling';
import {Func1} from '@jscrpt/common';

/**
 * Definition of http client error custom handler types
 */
export type HttpClientErrorCustomHandlerDef = HttpClientErrorCustomHandler|[HttpClientErrorCustomHandler, Func1<RestClientError, HttpClientError>, Func1<ClientValidationError, HttpClientError>?];