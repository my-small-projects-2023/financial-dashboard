
export class ExchangeDataDto {
    currency: string;
    value: number;

    constructor(currency: string, value: number) {
        this.currency = currency;
        this.value = value;
    }
}