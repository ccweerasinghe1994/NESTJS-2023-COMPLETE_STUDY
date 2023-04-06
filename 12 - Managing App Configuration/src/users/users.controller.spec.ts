import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

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
        if (!id) return Promise.resolve(null);
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
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
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

  it('findAllUsers return list of users with matching email', async () => {
    const users = await controller.findAllUsers('abc@abc.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('abc@abc.com');
  });

  it('findUser return a single user with given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
    expect(user.email).toEqual('asas@gmail.com');
  });

  it('findUser return null if the id is not provided', async () => {
    const user = await controller.findUser('');
    expect(user).toBeNull();
  });
  it('findUser throw an NotFoundException if the give id is not belong to a user', async () => {
    FakeUsersService.findOne = (_id: number) => {
      throw new NotFoundException('User not found');
    };
    try {
      await controller.findUser('2');
    } catch (error) {
      expect(error.message).toEqual('User not found');
    }
  });

  it('signIn return a user if the given email and password is correct', async () => {
    const session = {
      userId: -1,
    };
    const user = await controller.signIn(
      { email: 'as', password: 'as' },
      session,
    );
    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
