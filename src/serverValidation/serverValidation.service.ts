import {Injectable} from '@angular/core';
import {extend} from '@jscrpt/common';
import {Subject, Observable} from 'rxjs';

import {HttpClientValidationErrors} from '../misc/httpError.interface';

/**
 * Service that is used for distribution of server validations
 */
@Injectable({providedIn: 'root'})
export class ServerValidationService
{
    //######################### protected fields #########################
    
    /**
     * Subject that enables emiting server validation has changed, parameter indicates whether there are errors present, or not
     */
    protected _serverValidationsChangedSubject: Subject<boolean> = new Subject<boolean>();

    /**
     * Server validation errors that are currently present
     */
    protected _serverValidations: HttpClientValidationErrors = {};
    
    /**
     * Server validation errors that are currently present, cached version for external use
     */
    protected _serverValidationsCache?: HttpClientValidationErrors;
    
    //######################### public properties #########################
    
    /**
     * Occurs when server validation has changed, parameter indicates whether errors were added or removed
     */
    public get serverValidationsChanged(): Observable<boolean>
    {
        return this._serverValidationsChangedSubject.asObservable();
    }
    
    /**
     * Server validation errors that are currently present
     */
    public get serverValidations(): HttpClientValidationErrors
    {
        return (this._serverValidationsCache ??= extend(true, {}, this._serverValidations));
    }

    /**
     * Gets array of server validation properties
     */
    public get serverValidationProperties(): string[]
    {
        return Object.keys(this._serverValidations);
    }
    
    //######################### public methods #########################
    
    /**
     * Adds server validation errors
     * @param validationErrors - List of validation errors
     */
    public addServerValidationErrors(validationErrors: HttpClientValidationErrors): void
    {
        extend(this._serverValidations, validationErrors);
        this._serverValidationsCache = undefined;

        this._serverValidationsChangedSubject.next(true);
    }
    
    /**
     * Clears all set server validation errors
     */
    public clearServerValidationErrors(): void
    {
        this._serverValidations = {};
        this._serverValidationsCache = undefined;

        this._serverValidationsChangedSubject.next(false);
    }

    /**
     * Removes validation errors for single property
     * @param property - Name of property which errors will be removed
     */
    public removeServerValidationError(property: string): void
    {
        delete this._serverValidations[property];
        this._serverValidationsCache = undefined;

        this._serverValidationsChangedSubject.next(false);
    }
}