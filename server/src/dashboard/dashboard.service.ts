import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ImitatorService } from 'src/imitator/imitator.service';
import { ExchangeRateDto } from 'src/imitator/dto/exchange-rate.dto';

@Injectable()
export class DashboardService {

  private readonly logger = new Logger(DashboardService.name);
  private readonly BASE_CURRENCY = 'USD'
  private readonly mockCurrencies = {
    "data": {
        "AUD": 1.5441602132,
        "CAD": 1.3757502519,
        "CNY": 7.2288108907,
        "EUR": 0.9388601291,
        "GBP": 0.8024101247,
        "ILS": 3.7291906594,
        "JPY": 153.2778798933,
        "NZD": 1.6818502481
    }
  }

  constructor(private readonly httpService: HttpService, private readonly imitator: ImitatorService) {}
  


  async getCurrencies(): Promise<string> {
    const externalUrl = `${process.env.OPEN_EXCHANGE_RATES_BASE_URL}/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATES_KEY}`
    const { data } = await firstValueFrom(
      this.httpService.get<string>(externalUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            'Server error',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }),
      ),
    );

    return data;
  }

  async convertCurrencies(base: string, target: string, amount: number): Promise<string>{
    const externalUrl = `${process.env.EXCHANGE_RATE_API_BASE_URL}/${process.env.EXCHANGE_RATE_API_KEY}/pair/${base}/${target}/${amount}`
    const { data } = await firstValueFrom(
      this.httpService.get<string>(externalUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            'Server error',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }),
      ),
    );

    return data;
  }

  async getExchangeRate(period: string, base: string, target: string): Promise<string> {
    const externalUrl = `${process.env.ALFA_VANTAGE_BASE_URL}/query?function=${period}&from_symbol=${base}&to_symbol=${target}&apikey=${process.env.ALFA_VANTAGE_KEY}`
    const { data } = await firstValueFrom(
      this.httpService.get<string>(externalUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            'Server error',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }),
      ),
    );
    const keys: string[] = Object.keys(data);
    if(keys.length <= 1){
      throw new HttpException(
        'API Rate Limit Exceeded',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return data;

  }

  // socket connection imitator
  async getRealTimeExchangeRate(base: string, currencies: string[]): Promise<ExchangeRateDto[]> {
    // *** currency list mocked in order not to go to the server to many times
    // *** can be uncomment and replised with data below

    // const givenCurrencies = currencies.join(',');
    // const externalUrl = `${process.env.FREE_CURRENCY_API_BASE_URL}/latest?apikey=${process.env.FREE_CURRENCY_API_LEY}&base_currency=${base}&currencies=${givenCurrencies}`   
    // const { data } = await firstValueFrom(
    //   this.httpService.get<string>(externalUrl).pipe(
    //     catchError((error: AxiosError) => {
    //       this.logger.error(error.response.data);
    //          throw new HttpException(
    //            'Server error',
    //             HttpStatus.SERVICE_UNAVAILABLE,
    //          );
    //     }),
    //   ),
    // );

    const data = this.mockCurrencies;
    const realTimeData = await this.imitator.getRealTimeExchangeRate(data);

    return realTimeData;

  }


  
  
  

}