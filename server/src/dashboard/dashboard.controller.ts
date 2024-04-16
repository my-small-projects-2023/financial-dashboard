import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { AuthGuard } from "../auth/auth.guard";
import { RequestCurrenciesDto } from "./dto/request-currencies.dto";
import { ExchangeRateDto } from "src/imitator/dto/exchange-rate.dto";

@Controller("dashboard")
export class DashboardController {

  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(AuthGuard)
  @Get("currency")
  async getCurrencies(){
    return await this.dashboardService.getCurrencies();
  }

  @UseGuards(AuthGuard)
  @Get("convert/:base/:target/:amount")
  async convertCurrencies(@Param('base') base: string, @Param('target')target: string, 
    @Param('amount') amount: number): Promise<string>{
    return await this.dashboardService.convertCurrencies(base, target, amount);
  }

  @UseGuards(AuthGuard)
  @Get("exchangeRate/:period/:base/:target")
  async getExchangeRate(@Param('period') period: string, @Param('base') base: string, 
    @Param('target') target: string): Promise<string>{
    return await this.dashboardService.getExchangeRate(period, base, target);
  }

  @UseGuards(AuthGuard)
  @Post("realtime/:base")
  async getRealTimeExchangeRate(@Param('base') base: string, @Body() currencies: RequestCurrenciesDto): Promise<ExchangeRateDto[]> {
    return await this.dashboardService.getRealTimeExchangeRate(base, currencies.currencies);
  }



  

  


}