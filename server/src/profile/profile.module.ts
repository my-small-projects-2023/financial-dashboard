import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { Account, AccountSchema } from "src/auth/schemas/account.schema";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{name: Account.name, schema: AccountSchema}]),
        AuthModule
    ],
    controllers: [ProfileController],
    providers: [ProfileService],
})

export class ProfileModule {}