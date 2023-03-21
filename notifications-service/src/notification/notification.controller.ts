import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { RPC } from '../constants/rpc';
import { AppService } from '../nestConfig/app.service';
import { Rpc } from './decorators/rpc.decorator';

import { EmailDto } from './dto';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private appService: AppService,
  ) {}
  @Post()
  async saveEmailSubscriber(@Body() mail: EmailDto) {
    try {
      const { email } = mail;
      return await this.notificationService.saveSubscriber(email);
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Rpc()
  @MessagePattern(RPC.NEW_JOB_POST)
  async sendMailSubsNewJob(payload): Promise<any> {
    try {
      return await this.notificationService.sendMailSubscriptionNewJob(payload);
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Get('health')
  getHealth() {
    return this.appService.healthCheck();
  }
}
