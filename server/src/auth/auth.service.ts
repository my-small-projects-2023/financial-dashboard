import { CreateAccountDto } from "src/auth/dto/create-account.dto";
import { LoginAccountDto } from "./dto/login-account.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Account } from "src/auth/schemas/account.schema";
import { Model } from "mongoose";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ResponseAccountDto } from "./dto/response-account.dto";

const DEFAULT_CURRENCY = ['USD', 'EURO', 'NIS'];

@Injectable()
export class AuthService {

    constructor(@InjectModel(Account.name) private accountModel: Model<Account>, 
        private jwtService: JwtService) {}

    async signup(createAccountDto: CreateAccountDto): Promise<Account> {
        let createdAccount = null;
        let existAccount = await this.accountModel.findOne({email: createAccountDto.email});

        if(existAccount){
            throw new BadRequestException(`Account with email: ${createAccountDto.email} already exist`);
        }

        const hash = await bcrypt.hash(createAccountDto.password, 10);
        createdAccount = new this.accountModel({...createAccountDto, password: hash, currencies: DEFAULT_CURRENCY});
        createdAccount.save();

        return createdAccount;
      }
    
    async login(loginAccountDto: LoginAccountDto): Promise<ResponseAccountDto> {
        let account = await this.accountModel.findOne({email: loginAccountDto.email});
        if(!account){
            throw new UnauthorizedException();
        }
        const passwordMatch = await bcrypt.compare(loginAccountDto.password, account.password);
        if(!passwordMatch){
            throw new UnauthorizedException();
        }
        const payload = { sub: account._id , username: account.firstName };
        const access_token = await this.jwtService.signAsync(payload)
        return {    
            id: account.id,
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            currencies: account.currencies,
            token: access_token
        };
    }

    async getProfile(userId: string): Promise<Account> {
        let account = await this.accountModel.findById(userId)
        if(!account){
            throw new UnauthorizedException();
        }
        
        return account;
    }

    async updatePassword(userId: string, oldPassword: string, newPassword: string){
        let account = await this.accountModel.findById(userId)
        if(!account){
            throw new UnauthorizedException();
        }
        const passwordMatch = await bcrypt.compare(oldPassword, account.password);
        if(!passwordMatch){
            throw new UnauthorizedException();
        }
        const hash = await bcrypt.hash(newPassword, 10);
        const accountUpdate = new this.accountModel({...account, password: hash});
        accountUpdate.save();
    }
 

}