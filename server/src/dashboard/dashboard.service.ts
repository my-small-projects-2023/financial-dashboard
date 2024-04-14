import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class DashboardService {

  private readonly logger = new Logger(DashboardService.name);

  constructor(private readonly httpService: HttpService) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  async getCurrencies(): Promise<string> {
    const externalUrl = `${process.env.OPEN_EXCHANGE_RATES_BASE_URL}/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATES_KEY}`
    const { data } = await firstValueFrom(
      this.httpService.get<string>(externalUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
            throw 'An error happened!';
        }),
      ),
    );

    // *******
    console.log('***carrencies ', data)

    return data;
  }

  async convertCurrencies(base: string, target: string, amount: number): Promise<string>{
    const externalUrl = `${process.env.EXCHANGE_RATE_API_BASE_URL}/${process.env.EXCHANGE_RATE_API_KEY}/pair/${base}/${target}/${amount}`
    const { data } = await firstValueFrom(
      this.httpService.get<string>(externalUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
            throw 'An error happened!';
        }),
      ),
    );
    // *******
    console.log('***exchange data ', data)

    return data;
  }

  async getExchangeRate(period: string, fromCurrency: string, toCurrency: string): Promise<string> {

    const externalUrl = `${process.env.ALFA_VANTAGE_BASE_URL}/query?function=${period}&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=${process.env.ALFA_VANTAGE_KEY}`
      
    const { data } = await firstValueFrom(
      this.httpService.get<string>(externalUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
            throw 'An error happened!';
        }),
      ),
    );

    // *******
    console.log('***exchange rate ', data)

    return data;

  }

      


  
  
  

}