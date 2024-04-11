import { Body, Controller, Get, HttpStatus, Post, Put, Req, Request, Res, UseGuards } from "@nestjs/common"
import { CreateAccountDto } from "src/auth/dto/create-account.dto"
import { LoginAccountDto } from "./dto/login-account.dto"
import { AuthService } from "./auth.service"
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Res() response: any, @Body() createAccountDto: CreateAccountDto): Promise<string> {
    const newAccount = await this.authService.signup(createAccountDto);
    if(!newAccount){
        return response.status(HttpStatus.BAD_REQUEST).json({
            message: `Account with email: ${createAccountDto.email} already exist`
        })
    }

    return response.status(HttpStatus.OK).json({
        message: 'New account was created',
        newAccount,});
  }

  @Put("login")
  async login(@Body() loginAccountDto: LoginAccountDto): Promise<{access_token: string}> {

    return await this.authService.login(loginAccountDto);
  }

  @UseGuards(AuthGuard)
  @Put("update-password")
  async updatePassword(@Req() request: any, @Body() oldPassword: string, newPassword: string){
    const res = this.authService.updatePassword(request.account.sub, oldPassword, newPassword);
  }


  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(@Req() request: any, @Res() response: any) {
    const profile = await this.authService.getProfile(request.account.sub)
    if(!profile){
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: `user unauthorized`
    })
    }
    return response.status(HttpStatus.OK).json({
      message: "user",
      profile
    });
  }
}