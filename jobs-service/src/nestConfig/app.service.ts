import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return { serviceName: 'Jobs-Service', state: 'Running' };
  }
}
