import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { AuthModule } from "src/auth/auth.module";
import { HttpModule } from "@nestjs/axios";
import { ImitatorModule } from "src/imitator/imitator.module";
import { ImitatorService } from "src/imitator/imitator.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpModule,
        AuthModule,
        ImitatorModule
    ],
    controllers: [DashboardController],
    providers: [DashboardService, ImitatorService],
})

export class DashboardModule {}