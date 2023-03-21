import { CacheModule, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { dbConfig, mailerSetup, redis } from '../environment/config';
import { arrayControllers, arrayEntities, arrayProviders } from './arrayDependency';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: mailerSetup.host,
        secure: mailerSetup.secure,
        port: mailerSetup.port,
      },
    }),
    ScheduleModule.forRoot(),
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
    CacheModule.register({
      store: redisStore,
      host: redis.host,
      password: redis.password,
      port: redis.port,
    }),
  ],

  controllers: arrayControllers,
  providers: arrayProviders,
})
export class AppModule {}
