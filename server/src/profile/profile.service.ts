import { InjectModel } from "@nestjs/mongoose";
import { Account } from "src/auth/schemas/account.schema";
import { Model } from "mongoose";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

    async getProfile(userId: string): Promise<Account> {
        let profile = await this.accountModel.findById(userId)
        if(!profile){
            throw new UnauthorizedException();
        }
        return profile;
    }

    async updateProfile(userId: string, currencies: string[]): Promise<Account> {
        let profile = await this.accountModel.findById(userId)
        if(!profile){
            throw new UnauthorizedException();
        }
        profile.currencies = currencies;
        const updatedProfile = await profile.save();
        return updatedProfile;
    }

}