
export class ExchangeRateDto {
    currency: string;
    prevValue: number;
    currentValue: number;

    constructor(currency: string, prevValue: number, currentValue: number) {
        this.currency = currency;
        this.prevValue = prevValue;
        this.currentValue = currentValue;
    }
}