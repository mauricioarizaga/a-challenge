import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { dbConfig, redis } from '../environment/config';
import { saveJobMiddleware } from '../jobs/middleware/saveJob.middleware';
import { arrayControllers, arrayEntities, arrayProviders } from './arrayDependency';
@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      host: redis.host,
      password: redis.password,
      port: redis.port,
    }),
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.dbName,
      entities: arrayEntities,
      synchronize: dbConfig.synchronize === 'true' ? true : false,
      logging: dbConfig.logging === 'true' ? true : false,
    }),
    TypeOrmModule.forFeature(arrayEntities),
  ],
  controllers: arrayControllers,
  providers: arrayProviders,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(saveJobMiddleware).forRoutes({ path: 'jobs', method: RequestMethod.POST });
  }
}
