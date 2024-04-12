import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAccountDto {
    @IsNotEmpty({ message: 'First Name is required' })
    @IsString({ message: 'First Name not valid' })
    firstName: string;
    @IsNotEmpty({ message: 'Last Name is required' })
    @IsString({ message: 'Last Name not valid' })
    lastName: string;
    @IsEmail()
    email: string;
    @Length(6, 50, {
        message: 'Password length Must be between 6 and 50 charcters',
      })
    password: string;
}