import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';

@Controller('/auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // async getMe(@Session() session: any) {
  //   if (!session.userId) {
  //     throw new NotFoundException('Not Authenticated');
  //   }
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  async getMe(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signIn(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signUp(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
