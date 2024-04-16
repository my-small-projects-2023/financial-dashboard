import { InjectModel } from "@nestjs/mongoose";
import { Account } from "src/auth/schemas/account.schema";
import { Model } from "mongoose";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ProfileDto } from "./dto/profile.dto";

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

    async getProfile(userId: string): Promise<ProfileDto> {
        let profile = await this.accountModel.findById(userId)
        if(!profile){
            throw new UnauthorizedException();
        }
        return new ProfileDto(profile.firstName, profile.lastName, profile.email, profile.currencies);
    }

    async updateProfile(userId: string, currencies: string[]): Promise<ProfileDto> {
        let profile = await this.accountModel.findById(userId)
        if(!profile){
            throw new UnauthorizedException();
        }
        profile.currencies = currencies;
        const updatedProfile = await profile.save();

        return new ProfileDto(updatedProfile.firstName, updatedProfile.lastName, 
            updatedProfile.email, updatedProfile.currencies);
    }

}