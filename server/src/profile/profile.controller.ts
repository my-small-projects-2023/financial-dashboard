import { Body, Controller, Get, HttpStatus, Post, Put, Req, Request, Res, UseGuards } from "@nestjs/common"
import { ProfileService } from "./profile.service";
import { Account } from "src/auth/schemas/account.schema";
import { AuthGuard } from "src/auth/auth.guard";
import { RequestCurrenciesDto } from "./dto/request-currencies.dto";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getProfile(@Req() request: any, @Res() response: any): Promise<Account> {
    const profile = await this.profileService.getProfile(request.account.sub)
    return response.status(HttpStatus.OK).json({
        message: "user",
        profile
    });
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateProfile(@Req() request: any, @Res() response: any, @Body() currencies: RequestCurrenciesDto): Promise<Account> {
    const profile = await this.profileService.updateProfile(request.account.sub, currencies.currencies)
    return response.status(HttpStatus.OK).json({
        message: "user",
        profile
    });
  }

}