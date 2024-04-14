import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { AuthModule } from "src/auth/auth.module";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpModule,
        AuthModule
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})

export class DashboardModule {}