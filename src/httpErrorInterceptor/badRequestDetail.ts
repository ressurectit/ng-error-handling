import {Dictionary} from '@jscrpt/common';

/**
 * Information about error, formatted for REST api
 */
export interface BadRequestDetail
{
    /**
     * Gets or sets error messages that will be displayed
     */
    errors: string[];

    /**
     * Gets or sets validation error messages to be displayed
     */
    validationErrors: Dictionary<string[]>; 
}