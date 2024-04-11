import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    currencies: string[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);