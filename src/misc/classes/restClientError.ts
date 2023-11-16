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
