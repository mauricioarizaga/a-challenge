import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Inject, CACHE_MANAGER } from '@nestjs/common';
import Cache from 'cache-manager';
import { redis } from '../environment/config';

@Injectable()
export class RedisRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setData(index: string, data) {
    try {
      const messageParsed = JSON.parse(data.toString());
      await this.cacheManager.set(index, messageParsed, {
        ttl: redis.ttl,
      });
    } catch (error) {
      Logger.error({ error });
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
  async getData(index: string) {
    return await this.cacheManager.get(index);
  }
}
