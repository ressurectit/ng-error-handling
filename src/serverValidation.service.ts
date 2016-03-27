import {Injectable} from 'angular2/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import utils from 'ng2-common/utils'

/**
 * Service that is used for distribution of server validations
 */
@Injectable()
export class ServerValidationService
{
    //######################### private fields #########################
    
    /**
     * Subject that enables emiting server validation has changed, parameter indicates whether there are errors present, or not
     */
    private _serverValidationsChangedSubject: Subject<boolean> = new Subject();
    
    //######################### public properties #########################
    
    /**
     * Occurs when server validation has changed, parameter indicates whether there are errors present, or not
     */
    public get serverValidationsChanged(): Observable<boolean>
    {
        return this._serverValidationsChangedSubject.asObservable();
    }
    
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
        this._serverValidationsChangedSubject.next(true);
    }
    
    /**
     * Clears previously set server validation errors
     */
    public clearServerValidationErrors()
    {
        this.serverValidations = {};
        this._serverValidationsChangedSubject.next(false);
    }
}