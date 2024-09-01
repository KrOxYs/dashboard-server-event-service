import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateEventDto } from './event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // get message from rabbitmq
  @EventPattern('event_created')
  createEvent(data: CreateEventDto) {
    // get the message to create a data
    return this.appService.createEvent(data);
  }

  // get message from rabbitmq
  @EventPattern('event_updated')
  updateEvent(data: CreateEventDto & { id: string }) {
    // get the message to update data
    return this.appService.updateEvent(data.id, data);
  }

  // send message to rabbitmq
  @MessagePattern('get-events-by-email')
  getEventsByEmail(@Payload() email: string) {
    // send result getEventsByEmail to rabbitmq
    return this.appService.getEventsByEmail(email);
  }

  // send message to rabbitmq
  @MessagePattern('get-vendor-by-email')
  getVendorByEmail(@Payload() email: string) {
    // send result getVendorByEmail to rabbitmq
    return this.appService.getVendorByEmail(email);
  }
}
