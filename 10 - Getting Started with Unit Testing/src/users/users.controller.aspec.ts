import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let FakeUsersService: Partial<UsersService>;
  let FakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    FakeUsersService = {
      find:()=>{},
      findOne:()=>{},
      remove:()=>{},
      update:()=>{}
    };

    FakeAuthService = {
       signIn():()=>{},
      signUp():()=>{}
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
