import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('/auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { username, password } = body;
    return this.usersService.create(username, password);
  }

  @Get('/users')
  findUsers() {
    return this.usersService.findAll();
  }
}
