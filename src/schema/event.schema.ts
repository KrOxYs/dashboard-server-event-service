import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: new Date() })
  dateCreated: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  emailHr: string;

  @Prop({ required: true })
  emailVendor: string;

  @Prop({ type: [Object], required: true })
  ProposedDate: Array<any>;

  @Prop({ type: Object })
  confirmedDate: any;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  remarks: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
