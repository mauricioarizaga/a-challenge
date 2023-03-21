import { HttpException, Injectable, Logger } from '@nestjs/common';
import { RedisRepository } from '../redis/redis.repository';
import { EventRepository } from './event.repository';
@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository, private redisRepository: RedisRepository) {}

  async subscribeEvent() {
    try {
      const message = await this.eventRepository.subscribeMessage();

      Logger.log({ message }, { viewer: '----------------------------' });
      if (message) return message;
    } catch (error) {
      Logger.error({ error });
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
