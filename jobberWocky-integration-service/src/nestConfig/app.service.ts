import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return { serviceName: 'JobberWocky-Service', state: 'Running' };
  }
}
