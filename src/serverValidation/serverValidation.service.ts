import {Injectable} from '@angular/core';
import {extend, Dictionary} from '@jscrpt/common';
import {Subject, Observable} from 'rxjs';

/**
 * Service that is used for distribution of server validations
 */
@Injectable({providedIn: 'root'})
export class ServerValidationService
{
    //######################### private fields #########################
    
    /**
     * Subject that enables emiting server validation has changed, parameter indicates whether there are errors present, or not
     */
    private _serverValidationsChangedSubject: Subject<boolean> = new Subject<boolean>();
    
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
     * @param validationErrors - List of validation errors
     */
    public addServerValidationErrors(validationErrors: Dictionary<string[]>): void
    {
        extend(this.serverValidations, validationErrors);
        this._serverValidationsChangedSubject.next(true);
    }
    
    /**
     * Clears previously set server validation errors
     */
    public clearServerValidationErrors(): void
    {
        this._serverValidationsChangedSubject.next(false);
        this.serverValidations = {};
    }
}