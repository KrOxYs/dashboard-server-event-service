import { Injectable } from '@nestjs/common';
import { Event } from './schema/event.schema';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel,
    @InjectModel(User.name) private readonly userModel,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  // create event
  async createEvent(event: Event): Promise<Event> {
    // get the message to create a data
    const newEvent = new this.eventModel(event);

    // save data to database
    return await newEvent.save();
  }

  // update event
  async updateEvent(id: string, event: Event): Promise<Event> {
    // get the message to update data
    return await this.eventModel
      .findOneAndUpdate({ _id: id }, event, { new: true })
      .exec();
  }

  // get event by email
  async getEventsByEmail(email: string): Promise<{ events: Event[] }> {
    // send result getEventsByEmail to rabbitmq
    const events = await this.eventModel
      .find({
        $or: [{ emailHr: email }, { emailVendor: email }],
      })
      .exec();
    return events;
  }

  // get vendor by email
  async getVendorByEmail(email: string): Promise<{ user: User }> {
    // get the email to find event
    const event = await this.eventModel
      .findOne({
        $or: [{ emailHr: email }, { emailVendor: email }],
      })
      .exec();

    // find user from event emailVendor
    const user = await this.userModel
      .findOne({ email: event.emailVendor })
      .exec();

    // return user
    return user;
  }
}
