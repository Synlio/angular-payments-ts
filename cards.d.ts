export declare type CardFormat = {
    type: string;
    pattern: RegExp;
    format: RegExp;
    inputFormat: RegExp;
    length: number[];
    cvcLength: number[];
    luhn: boolean;
};
export declare type ExpiryString = {
    month: string;
    year: string;
};
export declare type Expiry = {
    month: number;
    year: number;
};
export declare class Cards {
    static readonly defaultFormat: RegExp;
    static readonly defaultInputFormat: RegExp;
    static readonly cardFormats: CardFormat[];
    static fromNumber(number: string): CardFormat;
    static fromType(type: string): CardFormat;
    static parseExpiryAsString(value?: string): ExpiryString;
    static parseExpiry(value: ExpiryString): Expiry;
}
