import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Account, AccountSchema } from "src/auth/schemas/account.schema";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{name: Account.name, schema: AccountSchema}]),
        JwtModule.register({
            global: true,
            secret: process.env.TOKEN_KEY,
            signOptions: { expiresIn: '60d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})

export class AuthModule {}