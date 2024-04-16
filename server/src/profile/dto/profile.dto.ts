import { last } from "rxjs";

export class ProfileDto {
    firstName: string;
    lastName: string;
    email: string;
    currencies: string[];

    constructor(firstName: string, lastName: string, email: string, currencies: string[]){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.currencies = currencies;
    }
  }