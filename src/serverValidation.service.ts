import {Injectable, EventEmitter} from 'angular2/core';
import utils from 'ng2-common/utils'

/**
 * Service that is used for distribution of server validations
 */
@Injectable()
export class ServerValidationService
{
    //######################### public properties #########################
    
    /**
     * Occurs when server validation has changed, parameter indicates whether there are errors present, or not
     */
    public serverValidationsChanged: EventEmitter<boolean> = new EventEmitter();
    
    /**
     * Server validation errors that are currently present
     */
    public serverValidations: {[key: string]: string[]} = {};
    
    //######################### public methods #########################
    
    /**
     * Adds server validation errors
     * @param {{[key:string]:string[]}} validationErrors List of validation errors
     */
    public addServerValidationErrors(validationErrors: {[key: string]: string[]})
    {
        utils.common.extend(this.serverValidations, validationErrors);
        this.serverValidationsChanged.emit(true);
    }
    
    /**
     * Clears previously set server validation errors
     */
    public clearServerValidationErrors()
    {
        this.serverValidations = {};
        this.serverValidationsChanged.emit(false);
    }
}