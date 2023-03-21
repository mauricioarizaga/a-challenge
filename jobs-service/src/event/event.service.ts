import { HttpException, Injectable, Logger } from '@nestjs/common';
import { EventRepository } from './event.repository';
@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async sendEvent(event: any) {
    try {
      Logger.verbose({ eventData: event });
      const message = await this.eventRepository.publishMessage(event);
      Logger.verbose({ message });

      return message;
    } catch (error) {
      Logger.error({ error, message: 'Event cant be sent to Server Kafka' });
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
