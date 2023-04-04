import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    //   see if the email in use
    const users = await this.usersService.find(email);
    if (users.length) {
      //   throw an error
      throw new BadRequestException('Email in use');
    }
    //   if not, hash their password
    //   create a new user and save them to the db
    //   return the user
  }

  signIn(email: string, password: string) {}
}
