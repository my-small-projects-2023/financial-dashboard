
export default interface DashBoardService {

    getExchangeRate(period: string, fromCurrency: string, toCurrency: string): Promise<any>;
    getCurrenciesList(): Promise<any>;
    convertCurrencies(base: string, target: string, amount: string): Promise<any>;
    getRealTimeExchangeRate(base: string, currencies: string[]): Promise<any>;
}