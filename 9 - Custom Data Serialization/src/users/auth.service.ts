import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

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
    // generate a salt
    const salt = randomBytes(8).toString('hex');
    // hash the salt + the plain text password
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // join the salt and the hash together
    const result = salt + '.' + hash.toString('hex');
    //   create a new user and save them to the db
    //   return the user
    return await this.usersService.create(email, result);
  }

  signIn(email: string, password: string) {}
}
