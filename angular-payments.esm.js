import { Directive, ElementRef, forwardRef, Component, Output, EventEmitter, Inject, NgModule } from '@angular/core';
import { NG_VALIDATORS, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

var _defaultFormat = /(\d{1,4})/g;
var _defaultInputFormat = /(?:^|\s)(\d{4})$/;
var _cardFormats = [
    {
        type: 'maestro',
        pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [12, 13, 14, 15, 16, 17, 18, 19],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'dinersclub',
        pattern: /^(36|38|30[0-5])/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [14],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'laser',
        pattern: /^(6706|6771|6709)/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16, 17, 18, 19],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'jcb',
        pattern: /^35/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'unionpay',
        pattern: /^62/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16, 17, 18, 19],
        cvcLength: [3],
        luhn: false
    }, {
        type: 'discover',
        pattern: /^(6011|65|64[4-9]|622)/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'mastercard',
        pattern: /^5[1-5]/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'mastercard',
        pattern: /^2/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'amex',
        pattern: /^3[47]/,
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        inputFormat: /^(\d{4}|\d{4}\s\d{6})$/,
        length: [15],
        cvcLength: [3, 4],
        luhn: true
    }, {
        type: 'visa',
        pattern: /^4/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [13, 14, 15, 16],
        cvcLength: [3],
        luhn: true
    }
];
var Cards = (function () {
    function Cards() {
    }
    Object.defineProperty(Cards, "defaultFormat", {
        get: function () {
            return _defaultFormat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cards, "defaultInputFormat", {
        get: function () {
            return _defaultInputFormat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cards, "cardFormats", {
        get: function () {
            return _cardFormats;
        },
        enumerable: true,
        configurable: true
    });
    Cards.fromNumber = function (number) {
        number = (number + '').replace(/\D/g, '');
        for (var i = 0; i < this.cardFormats.length; i++) {
            var card = this.cardFormats[i];
            if (card.pattern.test(number)) {
                return card;
            }
        }
    };
    Cards.fromType = function (type) {
        for (var i = 0; i < this.cardFormats.length; i++) {
            var card = this.cardFormats[i];
            if (card.type == type) {
                return card;
            }
        }
    };
    Cards.parseExpiryAsString = function (value) {
        value = value || '';
        value = value.replace(/\s/g, '');
        var _ref = value.split('/', 2);
        var month = _ref[0];
        var year = _ref[1];
        if (year && year.length === 2 && /^\d+$/.test(year)) {
            var prefix = (new Date())
                .getFullYear()
                .toString()
                .slice(0, 2);
            year = prefix + year;
        }
        return {
            month: month,
            year: year
        };
    };
    Cards.parseExpiry = function (value) {
        return {
            month: parseInt(value.month, 10),
            year: parseInt(value.year, 10)
        };
    };
    return Cards;
}());

var AbstractInputDirective = (function () {
    // #endregion Properties
    function AbstractInputDirective(el) {
        this.el = el;
    }
    Object.defineProperty(AbstractInputDirective.prototype, "_element", {
        // #region Properties
        get: function () {
            return this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractInputDirective.prototype, "_elementInput", {
        get: function () {
            return this.__getRealElement(this.el.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractInputDirective.prototype, "_elementValue", {
        get: function () {
            if ('value' in this._element) {
                return this._element.value;
            }
            else if (this._elementInput && 'value' in this._elementInput) {
                return this._elementInput.value;
            }
            else {
                return null;
            }
        },
        set: function (value) {
            if ('value' in this._element) {
                this._element.value = value;
            }
            else if (this._elementInput && 'value' in this._elementInput) {
                this._elementInput.value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractInputDirective.prototype, "_elementCardType", {
        get: function () {
            var card;
            var attr = this._element.attributes.getNamedItem('payments-card-type');
            if (attr != null) {
                card = Cards.fromType(attr.value);
            }
            return card;
        },
        enumerable: true,
        configurable: true
    });
    AbstractInputDirective.prototype.ngAfterViewInit = function () {
        this.__setupElement();
        this._ngAfterViewInit();
    };
    // #endregion Abstract functions to implement
    // #region Protected utility functions
    AbstractInputDirective.prototype._hasTextSelected = function () {
        if (!this._elementInput) {
            return false;
        }
        if (this._elementInput.selectionStart !== null && this._elementInput.selectionStart !== this._elementInput.selectionEnd) {
            return true;
        }
        // Not sure what this originally did, and as it stands document.selection does not seem to exist
        // if (document.selection) {
        //     return true;
        // }
        return false;
    };
    AbstractInputDirective.prototype._isInvalidKey = function (e) {
        var digit = e.key;
        return !/^\d+$/.test(digit) && !e.metaKey && e.charCode !== 0 && !e.ctrlKey;
    };
    // #endregion Protected utility functions
    // #region Private functions
    AbstractInputDirective.prototype.__setupElement = function () {
        this._element.addEventListener('keypress', this._restrict.bind(this));
        this._element.addEventListener('keypress', this._format.bind(this));
        this._element.addEventListener('keydown', this._formatBack.bind(this));
        this._element.addEventListener('paste', this._reFormat.bind(this));
    };
    AbstractInputDirective.prototype.__getRealElement = function (elem) {
        // It's possible that this was attached to an element that contains an input field
        // If so, assume we only care about the first element
        // Note: This is mainly for ion-input when using ionic
        if (elem.nodeName.toLowerCase() !== 'input') {
            var children = elem.childNodes;
            elem = null;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.nodeName.toLowerCase() === 'input') {
                    elem = child;
                    break;
                }
            }
            if (elem == null) {
                console.warn("angular-payments-ts: Element had payments-directive added but no valid target inputs were found");
            }
        }
        return elem;
    };
    return AbstractInputDirective;
}());

var selector = '[payments-card]';
var AngularPaymentsCardDirective = (function (_super) {
    __extends(AngularPaymentsCardDirective, _super);
    function AngularPaymentsCardDirective(el) {
        return _super.call(this, el) || this;
    }
    AngularPaymentsCardDirective_1 = AngularPaymentsCardDirective;
    AngularPaymentsCardDirective.prototype.validate = function (c) {
        var value = this._elementValue;
        var issue = {};
        issue[selector] = false;
        this.__clearCardClass();
        // Empty number is valid (should be handled with a 'required' directive)
        if (!value) {
            return null;
        }
        value = (value + '').replace(/\s+|-/g, '');
        if (c.value != value) {
            c.setValue(value, {
                emitModelToViewChange: false
            });
        }
        if (!/^\d+$/.test(value)) {
            return issue;
        }
        var card = Cards.fromNumber(value);
        if (!card) {
            return issue;
        }
        this.__clearCardClass();
        this.__setCardClass(card);
        if (card.luhn && !this.__luhnCheck(value)) {
            return issue;
        }
        var lengthMatch = false;
        for (var i = 0; i < card.length.length; i++) {
            var length = card.length[i];
            if (value.length === length) {
                lengthMatch = true;
            }
        }
        if (!lengthMatch) {
            return issue;
        }
        return null;
    };
    AngularPaymentsCardDirective.prototype._ngAfterViewInit = function () {
    };
    AngularPaymentsCardDirective.prototype._restrict = function (e) {
        // Catch delete, tab, backspace, arrows, etc..
        if (e.which === 8 || e.which === 0) {
            return;
        }
        var digit = e.key;
        if (!/^\d+$/.test(digit)) {
            e.preventDefault();
            return;
        }
        if (this._hasTextSelected()) {
            return;
        }
        var value = (this._elementValue + digit).replace(/\D/g, '');
        var card = Cards.fromNumber(value);
        var upperLength = 16;
        if (card) {
            upperLength = card.length[card.length.length - 1];
        }
        if (value.length > upperLength) {
            e.preventDefault();
        }
    };
    AngularPaymentsCardDirective.prototype._format = function (e) {
        // Catch delete, tab, backspace, arrows, etc..
        if (e.which === 8 || e.which === 0) {
            return;
        }
        if (this._isInvalidKey(e)) {
            e.preventDefault();
            return;
        }
        var value = this._elementValue;
        if (this.__checkSelectionValueLength(value)) {
            return;
        }
        var digit = e.key;
        var card = Cards.fromNumber(value + digit);
        var length = (value.replace(/\D/g, '') + digit).length;
        var re = Cards.defaultInputFormat;
        var upperLength = 16;
        if (card) {
            re = card.inputFormat;
            upperLength = card.length[card.length.length - 1];
        }
        if (length >= upperLength) {
            // Shouldn't we be stopping propogation here?
            return;
        }
        if (re.test(value)) {
            e.preventDefault();
            this._elementValue = value + ' ' + digit;
        }
        else if (re.test(value + digit)) {
            e.preventDefault();
            this._elementValue = value + digit + ' ';
        }
    };
    AngularPaymentsCardDirective.prototype._formatBack = function (e) {
        if (e.metaKey) {
            return;
        }
        if (e.which !== 8) {
            return;
        }
        var value = this._elementValue;
        if (this.__checkSelectionValueLength(value)) {
            return;
        }
        if (/\d\s$/.test(value) && !e.metaKey && e.keyCode >= 46) {
            e.preventDefault();
            this._elementValue = value.replace(/\d\s$/, '');
        }
        else if (/\s\d?$/.test(value)) {
            e.preventDefault();
            this._elementValue = value.replace(/\s\d?$/, '');
        }
    };
    AngularPaymentsCardDirective.prototype._reFormat = function (e) {
        // I'm not sure why the original code uses setTimeout, but I'm following suit
        setTimeout(function () {
            this._elementValue = this.__getFormattedCardNumber();
        }.bind(this));
    };
    AngularPaymentsCardDirective.prototype.__getFormattedCardNumber = function () {
        var value = this._elementValue;
        var card = Cards.fromNumber(value);
        if (!card) {
            return this._elementValue;
        }
        var upperLength = card.length[card.length.length - 1];
        value = value.replace(/\D/g, '');
        value = value.slice(0, +upperLength + 1 || 9e9);
        if (card.format.global) {
            var ref = value.match(card.format);
            return ref !== null ? ref.join(' ') : void 0;
        }
        else {
            var groups = card.format.exec(value);
            if (groups !== null) {
                groups.shift();
            }
            return groups !== null ? groups.join(' ') : void 0;
        }
    };
    AngularPaymentsCardDirective.prototype.__parseCardNumber = function () {
        var value = this._elementValue;
        return value !== null && value !== undefined ? value.replace(/\s/g, '') : value;
    };
    AngularPaymentsCardDirective.prototype.__checkSelectionValueLength = function (value) {
        // I'm not sure what this actually does x.x
        if (!this._elementInput) {
            return false;
        }
        return this._elementInput.selectionStart !== null && this._elementInput.selectionStart !== value.length;
    };
    AngularPaymentsCardDirective.prototype.__luhnCheck = function (value) {
        var odd = true;
        var sum = 0;
        var digits = (value + '').split('').reverse();
        for (var i = 0; i < digits.length; i++) {
            var digit = parseInt(digits[i], 10);
            if ((odd = !odd)) {
                digit *= 2;
            }
            if (digit > 9) {
                digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
    };
    AngularPaymentsCardDirective.prototype.__clearCardClass = function () {
        var cards = Cards.cardFormats;
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            this._element.classList.remove('payments-card-' + card.type);
        }
        this.__clearCardAttr();
    };
    AngularPaymentsCardDirective.prototype.__setCardClass = function (card) {
        this._element.classList.add('payments-card-' + card.type);
        this.__setCardAttr(card);
    };
    AngularPaymentsCardDirective.prototype.__clearCardAttr = function () {
        var elems = document.querySelectorAll('[payments-card-type]');
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i];
            elem.removeAttribute('payments-card-type');
        }
    };
    AngularPaymentsCardDirective.prototype.__setCardAttr = function (card) {
        var attributes = ['card', 'cvc', 'expiry'];
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var attributeName = attributes_1[_i];
            var elems = document.querySelectorAll('[payments-' + attributeName + ']');
            for (var i = 0; i < elems.length; i++) {
                var elem = elems[i];
                elem.setAttribute('payments-card-type', card.type);
            }
        }
    };
    AngularPaymentsCardDirective = AngularPaymentsCardDirective_1 = __decorate([
        Directive({
            selector: selector,
            providers: [
                { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return AngularPaymentsCardDirective_1; }), multi: true }
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" && _a || Object])
    ], AngularPaymentsCardDirective);
    return AngularPaymentsCardDirective;
    var AngularPaymentsCardDirective_1, _a;
}(AbstractInputDirective));

var selector$1 = '[payments-cvc]';
var AngularPaymentsCVCDirective = (function (_super) {
    __extends(AngularPaymentsCVCDirective, _super);
    function AngularPaymentsCVCDirective(el) {
        return _super.call(this, el) || this;
    }
    AngularPaymentsCVCDirective_1 = AngularPaymentsCVCDirective;
    AngularPaymentsCVCDirective.prototype.validate = function () {
        var value = this._elementValue;
        var issue = {};
        issue[selector$1] = false;
        if (!value) {
            return null;
        }
        if (!/^\d+$/.test(value)) {
            return issue;
        }
        var card = this._elementCardType;
        if (card) {
            if (value.length !== card.cvcLength[card.cvcLength.length - 1]) {
                return issue;
            }
        }
        else {
            if (value.length !== 3 && value.length !== 4) {
                return issue;
            }
        }
        return null;
    };
    AngularPaymentsCVCDirective.prototype._ngAfterViewInit = function () {
    };
    AngularPaymentsCVCDirective.prototype._restrict = function (e) {
    };
    AngularPaymentsCVCDirective.prototype._format = function (e) {
        // Catch delete, tab, backspace, arrows, etc..
        if (e.which === 8 || e.which === 0) {
            return;
        }
        if (this._isInvalidKey(e)) {
            e.preventDefault();
            return;
        }
        if (this._hasTextSelected()) {
            return;
        }
        var value = this._elementValue + e.key;
        var card = this._elementCardType;
        var length = card != null ? card.cvcLength[card.cvcLength.length - 1] : 4;
        if (value.length <= length) {
            return;
        }
        else {
            e.preventDefault();
            return;
        }
    };
    AngularPaymentsCVCDirective.prototype._formatBack = function (e) {
    };
    AngularPaymentsCVCDirective.prototype._reFormat = function (e) {
    };
    AngularPaymentsCVCDirective = AngularPaymentsCVCDirective_1 = __decorate([
        Directive({
            selector: selector$1,
            providers: [
                { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return AngularPaymentsCVCDirective_1; }), multi: true }
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" && _a || Object])
    ], AngularPaymentsCVCDirective);
    return AngularPaymentsCVCDirective;
    var AngularPaymentsCVCDirective_1, _a;
}(AbstractInputDirective));

var selector$2 = '[payments-expiry]';
var AngularPaymentsExpiryDirective = (function (_super) {
    __extends(AngularPaymentsExpiryDirective, _super);
    function AngularPaymentsExpiryDirective(el) {
        return _super.call(this, el) || this;
    }
    AngularPaymentsExpiryDirective_1 = AngularPaymentsExpiryDirective;
    AngularPaymentsExpiryDirective.prototype.validate = function (c) {
        var value = this._elementValue;
        var issue = {};
        issue[selector$2] = false;
        if (!value) {
            return null;
        }
        var expiryAsString = Cards.parseExpiryAsString(this._elementValue);
        var month = expiryAsString.month;
        var year = expiryAsString.year;
        if (!(month && year)) {
            return issue;
        }
        if (!/^\d+$/.test(month)) {
            return issue;
        }
        if (!/^\d+$/.test(year)) {
            return issue;
        }
        if (parseInt(month, 10) > 12) {
            return issue;
        }
        if (year.length === 2) {
            var prefix = (new Date())
                .getFullYear()
                .toString()
                .slice(0, 2);
            year = prefix + year;
        }
        var expiry = Cards.parseExpiry({
            month: month,
            year: year
        });
        var expiryDate = new Date(expiry.year, expiry.month);
        var currentTime = new Date();
        if (expiryDate <= currentTime) {
            return issue;
        }
        if (c.value != expiry) {
            if (typeof (c.value) === 'string') {
                c.setValue(expiry, {
                    emitModelToViewChange: false
                });
            }
            else if ('month' in c.value && 'year' in c.value) {
                if (c.value.month != expiry.month && c.value.year != expiry.year) {
                    c.setValue(expiry, {
                        emitModelToViewChange: false
                    });
                }
            }
        }
        return null;
    };
    AngularPaymentsExpiryDirective.prototype._ngAfterViewInit = function () {
        this._element.addEventListener('keypress', this._formatForwardSlash.bind(this));
    };
    AngularPaymentsExpiryDirective.prototype._restrict = function (e) {
        if (this._isInvalidKey(e)) {
            e.preventDefault();
            return;
        }
        if (this._hasTextSelected()) {
            return;
        }
        var digit = e.key;
        var value = this._elementValue.replace(/\D/g, '');
        if (value.length >= 6) {
            e.preventDefault();
            return;
        }
    };
    AngularPaymentsExpiryDirective.prototype._format = function (e) {
        if (this._isInvalidKey(e)) {
            e.preventDefault();
            return;
        }
        var digit = e.key;
        var value = this._elementValue;
        var newValue = value + digit;
        var newDigit = parseInt(newValue, 10);
        if (/^\d\d$/.test(newValue)) {
            e.preventDefault();
            if (newDigit > 12) {
                this._elementValue = "0" + value + " / " + digit;
            }
            else {
                this._elementValue = "" + newValue + " / ";
            }
        }
    };
    AngularPaymentsExpiryDirective.prototype._formatForwardSlash = function (e) {
        var key = e.key;
        if (key !== '/') {
            return;
        }
        var value = this._elementValue;
        if (/^\d{1,2}$/.test(value)) {
            if (value !== '0') {
                if (value.length === 1) {
                    value = "0" + value;
                }
                this._elementValue = value + " / ";
                return;
            }
        }
        e.preventDefault();
    };
    AngularPaymentsExpiryDirective.prototype._formatBack = function (e) {
        if (e.metaKey) {
            return;
        }
        if (e.which !== 8) {
            return;
        }
        var value = this._elementValue;
        if (this.__checkSelectionValueLength(value)) {
            return;
        }
        var slashCheck = /\d(\s|\/)+$/;
        if (slashCheck.test(value)) {
            e.preventDefault();
            this._elementValue = value.replace(slashCheck, '');
        }
    };
    AngularPaymentsExpiryDirective.prototype._reFormat = function (e) { };
    AngularPaymentsExpiryDirective.prototype.__checkSelectionValueLength = function (value) {
        // I'm not sure what this actually does x.x
        if (!this._elementInput) {
            return false;
        }
        return this._elementInput.selectionStart !== null && this._elementInput.selectionStart !== value.length;
    };
    AngularPaymentsExpiryDirective = AngularPaymentsExpiryDirective_1 = __decorate([
        Directive({
            selector: selector$2,
            providers: [
                { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return AngularPaymentsExpiryDirective_1; }), multi: true }
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" && _a || Object])
    ], AngularPaymentsExpiryDirective);
    return AngularPaymentsExpiryDirective;
    var AngularPaymentsExpiryDirective_1, _a;
}(AbstractInputDirective));

var AbstractCreditCardFormComponent = (function () {
    function AbstractCreditCardFormComponent(formBuilder) {
        var _this = this;
        this.name = new EventEmitter();
        this.number = new EventEmitter();
        this.cvc = new EventEmitter();
        this.expiry = new EventEmitter();
        this.status = new EventEmitter();
        this.form = new EventEmitter();
        this.creditCardForm = formBuilder.group({
            name: [''],
            number: [''],
            cvc: [''],
            expiry: [''],
        });
        this.creditCardForm.get('name').valueChanges.subscribe(function (data) {
            _this.name.emit(data);
        });
        this.creditCardForm.get('number').valueChanges.subscribe(function (data) {
            _this.number.emit(data);
        });
        this.creditCardForm.get('cvc').valueChanges.subscribe(function (data) {
            _this.cvc.emit(data);
        });
        this.creditCardForm.get('expiry').valueChanges.subscribe(function (data) {
            _this.expiry.emit(data);
        });
        this.creditCardForm.statusChanges.subscribe(function (data) {
            _this.status.emit(data);
        });
        setTimeout(function () {
            _this.form.emit(_this.creditCardForm);
        });
    }
    AbstractCreditCardFormComponent.metaData = {
        outputs: [
            'name',
            'number',
            'cvc',
            'expiry',
            'status',
            'form'
        ]
    };
    __decorate([
        Output('name'),
        __metadata("design:type", Object)
    ], AbstractCreditCardFormComponent.prototype, "name", void 0);
    __decorate([
        Output('number'),
        __metadata("design:type", Object)
    ], AbstractCreditCardFormComponent.prototype, "number", void 0);
    __decorate([
        Output('cvc'),
        __metadata("design:type", Object)
    ], AbstractCreditCardFormComponent.prototype, "cvc", void 0);
    __decorate([
        Output('expiry'),
        __metadata("design:type", Object)
    ], AbstractCreditCardFormComponent.prototype, "expiry", void 0);
    __decorate([
        Output('status'),
        __metadata("design:type", Object)
    ], AbstractCreditCardFormComponent.prototype, "status", void 0);
    __decorate([
        Output('form'),
        __metadata("design:type", Object)
    ], AbstractCreditCardFormComponent.prototype, "form", void 0);
    AbstractCreditCardFormComponent = __decorate([
        __param(0, Inject(FormBuilder)),
        __metadata("design:paramtypes", [typeof (_a = typeof FormBuilder !== "undefined" && FormBuilder) === "function" && _a || Object])
    ], AbstractCreditCardFormComponent);
    return AbstractCreditCardFormComponent;
    var _a;
}());
var CreditCardFormComponent = (function (_super) {
    __extends(CreditCardFormComponent, _super);
    function CreditCardFormComponent(formBuilder) {
        return _super.call(this, formBuilder) || this;
    }
    CreditCardFormComponent = __decorate([
        Component({
            selector: 'payments-credit-card-form',
            template: "<form [formGroup]=\"creditCardForm\">\n    <label>\n        <span>Cardholder name</span>\n        <input type=\"text\" name=\"\" [formControl]=\"creditCardForm.controls['name']\" />\n    </label>\n    <label>\n        <span>Card number</span>\n        <input type=\"text\" name=\"\" [formControl]=\"creditCardForm.controls['number']\" payments-card />\n    </label>\n    <label>\n        <span>Expiry</span>\n        <input type=\"text\" name=\"\" [formControl]=\"creditCardForm.controls['expiry']\" payments-expiry />\n    </label>\n    <label>\n        <span>CVC</span>\n        <input type=\"text\" name=\"\" [formControl]=\"creditCardForm.controls['cvc']\" payments-cvc />\n    </label>\n</form>",
            outputs: AbstractCreditCardFormComponent.metaData.outputs
        }),
        __param(0, Inject(FormBuilder)),
        __metadata("design:paramtypes", [typeof (_a = typeof FormBuilder !== "undefined" && FormBuilder) === "function" && _a || Object])
    ], CreditCardFormComponent);
    return CreditCardFormComponent;
    var _a;
}(AbstractCreditCardFormComponent));

var AngularPaymentsModule = (function () {
    function AngularPaymentsModule() {
    }
    AngularPaymentsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule, ReactiveFormsModule
            ],
            exports: [
                AngularPaymentsCardDirective,
                AngularPaymentsExpiryDirective,
                AngularPaymentsCVCDirective,
                CreditCardFormComponent
            ],
            declarations: [
                AngularPaymentsCardDirective,
                AngularPaymentsExpiryDirective,
                AngularPaymentsCVCDirective,
                CreditCardFormComponent
            ],
            providers: []
        })
    ], AngularPaymentsModule);
    return AngularPaymentsModule;
}());

export { AngularPaymentsModule, AngularPaymentsCardDirective, AngularPaymentsCVCDirective, AngularPaymentsExpiryDirective, AbstractCreditCardFormComponent, CreditCardFormComponent };
//# sourceMappingURL=angular-payments.esm.js.map
