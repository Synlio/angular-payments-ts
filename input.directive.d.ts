import { ElementRef, AfterViewInit } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
import { CardFormat } from './cards';
export declare abstract class AbstractInputDirective implements AfterViewInit, Validator {
    private el;
    protected readonly _element: any;
    protected readonly _elementInput: HTMLInputElement;
    protected _elementValue: string;
    protected readonly _elementCardType: CardFormat;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    abstract validate(c: AbstractControl): {
        [key: string]: any;
    };
    protected abstract _restrict(e: KeyboardEvent): any;
    protected abstract _format(e: KeyboardEvent): any;
    protected abstract _formatBack(e: KeyboardEvent): any;
    protected abstract _reFormat(e: KeyboardEvent): any;
    protected abstract _ngAfterViewInit(): any;
    protected _hasTextSelected(): boolean;
    protected _isInvalidKey(e: KeyboardEvent): boolean;
    private __setupElement();
    private __getRealElement(elem);
}
