
export default interface DashBoardService {

    getExchangeRate(period: string, fromCurrency: string, toCurrency: string): Promise<any>;
    getCurrenciesList(): Promise<any>
}