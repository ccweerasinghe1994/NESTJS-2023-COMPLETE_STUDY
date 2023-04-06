import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req.currentUser = await this.userService.findOne(userId);
    }
    next();
  }
}
