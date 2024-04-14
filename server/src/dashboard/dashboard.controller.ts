import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(AuthGuard)
  @Get("currency")
  async getCurrencies(){
    console.log('hello')
    return await this.dashboardService.getCurrencies();
  }

  @UseGuards(AuthGuard)
  @Get("convert/:base/:target")
  async convertCurrencies(@Param('base') base: string, @Param('target')target: string, 
    @Param('amount') amount: number){
    return await this.dashboardService.convertCurrencies(base, target, amount);
  }

  @UseGuards(AuthGuard)
  @Get("exchangeRate/:period/:from/:to")
  async getExchangeRate(@Param('period') period: string, @Param('from') fromCurrency: string, @Param('to') toCurrency: string){
    return await this.dashboardService.getExchangeRate(period, fromCurrency, toCurrency);
  }

  

  


}