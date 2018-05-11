import { ElementRef } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { AbstractInputDirective } from "./input.directive";
export declare class AngularPaymentsCardDirective extends AbstractInputDirective {
    constructor(el: ElementRef);
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    protected _ngAfterViewInit(): void;
    protected _restrict(e: KeyboardEvent): void;
    protected _format(e: KeyboardEvent): void;
    protected _formatBack(e: KeyboardEvent): void;
    protected _reFormat(e: KeyboardEvent): void;
    private __getFormattedCardNumber();
    private __parseCardNumber();
    private __checkSelectionValueLength(value);
    private __luhnCheck(value);
    private __clearCardClass();
    private __setCardClass(card);
    private __clearCardAttr();
    private __setCardAttr(card);
}
