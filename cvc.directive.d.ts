import { ElementRef } from "@angular/core";
import { AbstractInputDirective } from "./input.directive";
export declare class AngularPaymentsCVCDirective extends AbstractInputDirective {
    constructor(el: ElementRef);
    validate(): {
        [key: string]: any;
    };
    protected _ngAfterViewInit(): void;
    protected _restrict(e: KeyboardEvent): void;
    protected _format(e: KeyboardEvent): void;
    protected _formatBack(e: KeyboardEvent): void;
    protected _reFormat(e: KeyboardEvent): void;
}
