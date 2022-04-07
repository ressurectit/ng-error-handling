import {HttpClientValidationErrors} from './httpError.interface';

/**
 * Class that represents handled client error 4xx http status code
 */
export class RestClientError
{
    //######################### constructor #########################
    constructor(public messages: string[]|undefined|null)
    {
    }
}

/**
 * Class that represents handled 404 http status code
 */
export class RestNotFoundError extends RestClientError
{
}

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
