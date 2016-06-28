import {NgControlName, NgFormControl, Control, AsyncPipe} from '@angular/common';
import {Component, TemplateRef, ViewContainerRef, Input, OnInit, DoCheck, OnDestroy, ChangeDetectorRef, KeyValueDiffers, KeyValueDiffer, ViewChild, ContentChild, AfterViewInit} from '@angular/core';
import {SERVER_VALIDATIONS} from './serverValidationValidator.directive';
import {Subject} from 'rxjs/Subject';

/**
 * Implicit context for template
 */
export interface ImplicitString
{
    $implicit: string;
}

/**
 * Component that is used for displaying server validation messages
 */
@Component(
{
    selector: "[serverValidations]",
    pipes: [AsyncPipe],
    template: `<template #viewTemplate let-message><div class="alert alert-danger {{itemCssClass}}">{{message}}</div></template>
               <template ngFor [ngForTemplate]="itemTemplate | async" [ngForOf]="_errors"></template>
               <ng-content></ng-content>`
})
export class ServerValidationMessagesComponent implements OnInit, DoCheck, OnDestroy, AfterViewInit
{
    //######################### private fields #########################

    /**
     * Control which server validation errors are displayed
     */
    private _controlDirective: {control: Control};

    /**
     * Tracks changes of errors
     */
    private _errorsDiffer: KeyValueDiffer;

    /**
     * Errors that are displayed
     */
    private _errors: string[] = [];

    /**
     * Item render template from content
     */
    @ContentChild(TemplateRef)
    private _contentTemplate: TemplateRef<ImplicitString>;

    /**
     * Item render template from view
     */
    @ViewChild("viewTemplate")
    private _viewTemplate: TemplateRef<ImplicitString>;

    //######################### private properties #########################

    /**
     * Gets template for rendering single item
     */
    private itemTemplate: Subject<TemplateRef<ImplicitString>> = new Subject<TemplateRef<ImplicitString>>();

    //######################### private fields #########################

    /**
     * Control which server validation errors are displayed
     */
    @Input()
    public set serverValidations(control: any)
    {
        if(!(control instanceof NgControlName) && !(control instanceof NgFormControl))
        {
            throw new Error("Unable to assign 'serverValidations', because it is not NgFormControl or NgControlName instance");
        }

        this._controlDirective = control;
    }

    /**
     * Additional css classes that are applied to each rendered item with default template
     */
    @Input()
    public itemCssClass: string = "";

    /**
     * Error template that can be used for rendering items
     */
    @Input()
    public errorTemplate: TemplateRef<ImplicitString>;

    //######################### constructor #########################

    /**
     * Creates instance of MessageTemplate
     */
    constructor(private _changeDetector: ChangeDetectorRef,
                private _differs: KeyValueDiffers)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit()
    {
        if(!this._controlDirective)
        {
            throw new Error("You must set 'serverValidations' before use!");
        }
    }

    //######################### public methods - implementation of DoCheck #########################

    /**
     * Performs checks for server validations changes
     */
    public ngDoCheck(): any
    {
        if(!this._errorsDiffer)
        {
            if(this._controlDirective.control)
            {
                this._errorsDiffer = this._differs.find(this._controlDirective.control.errors || {}).create(this._changeDetector);
            }
            else
            {
                return;
            }
        }

        var diff = this._errorsDiffer.diff(this._controlDirective.control.errors);

        if(diff)
        {
            diff.forEachItem(itm =>
            {
                if(itm.key == SERVER_VALIDATIONS)
                {
                    if(this._controlDirective.control.errors[SERVER_VALIDATIONS])
                    {
                        this._errors = this._controlDirective.control.errors[SERVER_VALIDATIONS];
                    }
                    else
                    {
                        this._errors = [];
                    }
                }
            });
        }
    }

    //######################### public methods - implementation of AfterViewInit #########################

    /**
     * Called when content was initialized
     */
    public ngAfterViewInit()
    {
        if(this._contentTemplate)
        {
            this.itemTemplate.next(this._contentTemplate);
        }
        else if(this.errorTemplate)
        {
            this.itemTemplate.next(this.errorTemplate);
        }
        else if(this._viewTemplate)
        {
            this.itemTemplate.next(this._viewTemplate);
        }
        else
        {
            throw new Error("No template found!");
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._errorsDiffer)
        {
            this._errorsDiffer.onDestroy();
        }
    }
}