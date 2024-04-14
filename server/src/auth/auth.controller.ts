import { Body, Controller, Get, HttpStatus, Post, Put, Req, Request, Res, UseGuards } from "@nestjs/common"
import { CreateAccountDto } from "src/auth/dto/create-account.dto"
import { LoginAccountDto } from "./dto/login-account.dto"
import { AuthService } from "./auth.service"
import { ResponseAccountDto } from "./dto/response-account.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Res() response: any, @Body() createAccountDto: CreateAccountDto): Promise<string> {
    const newAccount = await this.authService.signup(createAccountDto);

    return response.status(HttpStatus.OK).json({
        message: 'New account was created',
        newAccount,});
  }

  @Post("login")
  async login(@Body() loginAccountDto: LoginAccountDto): Promise<ResponseAccountDto> {
    return await this.authService.login(loginAccountDto);
  }

}