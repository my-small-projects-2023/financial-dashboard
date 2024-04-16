import { Module } from "@nestjs/common";
import { ImitatorService } from "./imitator.service";

@Module({
    providers: [ImitatorService],
})

export class ImitatorModule {}