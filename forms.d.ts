import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
export declare class AbstractCreditCardFormComponent {
    name: EventEmitter<any>;
    number: EventEmitter<any>;
    cvc: EventEmitter<any>;
    expiry: EventEmitter<any>;
    status: EventEmitter<any>;
    form: EventEmitter<FormGroup>;
    creditCardForm: FormGroup;
    constructor(formBuilder: FormBuilder);
    static metaData: {
        outputs: string[];
    };
}
export declare class CreditCardFormComponent extends AbstractCreditCardFormComponent {
    constructor(formBuilder: FormBuilder);
}
