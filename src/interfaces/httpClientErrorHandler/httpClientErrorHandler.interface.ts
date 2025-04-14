import {PromiseOr} from '@jscrpt/common';

import {HttpClientError} from '../../misc/classes/httpClientError';
import {CatchHttpClientErrorOptions} from '../catchHttpClientErrorOptions/catchHttpClientErrorOptions.interface';

/**
 * Represents function that is used for handling http client error according status code
 */
export interface HttpClientErrorHandler<TError extends HttpClientError>
{
    (error: HttpClientError, options: CatchHttpClientErrorOptions): PromiseOr<TError|null>;
}
