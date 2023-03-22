import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const NotificationServiceProxy = {
  provide: 'notifications-service',
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
