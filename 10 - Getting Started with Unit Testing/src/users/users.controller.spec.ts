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
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asas' } as User]);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asas@gmail.com',
          password: 'asas',
        } as User);
      },
      // remove:()=>{},
      // update:()=>{}
    };

    FakeAuthService = {
      //  signIn():()=>{},
      // signUp():()=>{}
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: FakeUsersService },
        { provide: AuthService, useValue: FakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
