import { IsArray, ArrayMinSize, IsString, Matches } from 'class-validator';

export class RequestCurrenciesDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @Matches(/^[A-Z]{3}$/, { each: true, message: "Three uppercase letters required" })
  currencies: string[];
}