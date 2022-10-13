import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): { message: 'pong' } {
    return { message: 'pong' };
  }
}
