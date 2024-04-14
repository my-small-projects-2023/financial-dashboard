
export default interface ExchangeRateData {
    from: string,
    to: string,
    rateData: RateData[]
}

export interface RateData {
    date: string,
    open: string,
    high: string,
    low: string,
    close: string
}

export interface ExchangeData {
    date: string;
    [key: string]: string;
}