import { ElementRef } from "@angular/core";
import { AbstractInputDirective } from "./input.directive";
import { AbstractControl } from "@angular/forms";
export declare class AngularPaymentsExpiryDirective extends AbstractInputDirective {
    constructor(el: ElementRef);
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    protected _ngAfterViewInit(): void;
    protected _restrict(e: KeyboardEvent): void;
    protected _format(e: KeyboardEvent): void;
    protected _formatForwardSlash(e: KeyboardEvent): void;
    protected _formatBack(e: KeyboardEvent): void;
    protected _reFormat(e: KeyboardEvent): void;
    private __checkSelectionValueLength(value);
}
