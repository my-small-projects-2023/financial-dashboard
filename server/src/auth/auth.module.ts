import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Account, AccountSchema } from "src/auth/schemas/account.schema";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constants";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Account.name, schema: AccountSchema}]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60d' },
          }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})

export class AuthModule {}