import { Injectable, Logger } from '@nestjs/common';
import { ExchangeRateDto } from './dto/exchange-rate.dto';
import { ExchangeDataDto } from './dto/exchange-data.dto';

@Injectable()
export class ImitatorService {

  private readonly logger = new Logger(ImitatorService.name);
  private readonly INCREASE_ACTION = 'increase';
  private readonly DECREASE_ACTION = 'decrease';
  private readonly actions = ['increase', 'decrease', 'none']
  constructor() {}
  
  async getRealTimeExchangeRate(data: any): Promise<ExchangeRateDto[]> {
    const parsedData: ExchangeDataDto[] = this.parseData(data);
    const exchangeRateData: ExchangeRateDto[] = parsedData.map(e => {
        const action = this.getRandomInt(0, this.actions.length - 1);
        switch(this.actions[action]){
            case this.INCREASE_ACTION: return new ExchangeRateDto(e.currency, e.value, parseFloat((e.value + this.getRandomDouble(0, 1)).toFixed(10)));
            case this.DECREASE_ACTION: return new ExchangeRateDto(e.currency, e.value, parseFloat((e.value - this.getRandomDouble(0, 1)).toFixed(10)));
            default: return new ExchangeRateDto(e.currency, e.value, e.value)
        }
    })
    return exchangeRateData;
  }

  private parseData(data: any): ExchangeDataDto[] {
    const exchangeDataArray: ExchangeDataDto[] = [];
    for (const currency in data) {
        if (Object.prototype.hasOwnProperty.call(data, currency)) {
            for (const [key, value] of Object.entries(data[currency])) {
                exchangeDataArray.push(new ExchangeDataDto(key, value as number))
            }
        }
    }

    return exchangeDataArray;
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
  }

  private getRandomDouble(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  
  

}