import {HttpClientValidationErrors} from '../../interfaces';
import {RestClientError} from './restClientError';

/**
 * Class that represents handled 400 http status code with validations
 */
export class ClientValidationError extends RestClientError
{
    constructor(messages: string[]|undefined|null,
                public validationErrors: HttpClientValidationErrors|undefined|null)
    {
        super(messages);
    }
}
