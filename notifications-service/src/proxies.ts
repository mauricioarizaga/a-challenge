import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const JobServiceProxy = {
  provide: 'jobs-service',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: configService.get('JOBS_HOST'),
        port: configService.get('JOBS_PORT'),
      },
    }),
};

export const JobWockyServiceProxy = {
  provide: 'jobberWocky-integration-service',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: configService.get('NOTIFICATION_HOST'),
        port: configService.get('NOTIFICATION_PORT'),
      },
    }),
};
