import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  const users: User[] = [];
  beforeEach(async () => {
    fakeUserService = {
      find: (email: string) => {
        return Promise.resolve(users.filter((user) => user.email === email));
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 1000),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('creates a new user with a salted and hashed password', async () => {
      const user = await service.signUp('asdasd@gmail.com', 'asdasd');
      expect(user.password).not.toEqual('asdasd');
      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
      await service.signUp('abc@gmail.com', 'abc');
      try {
        await service.signUp('abc@gmail.com', 'abc');
      } catch (e) {
        expect(e.message).toEqual('Email in use');
      }
    });
  });

  describe('signin', () => {
    it('throws if an invalid email is provided', async () => {
      try {
        await service.signIn('abc', 'abc');
      } catch (e) {
        expect(e.message).toEqual('Invalid email');
      }
    });

    it('throws if an invalid password is provided', async () => {
      try {
        await service.signIn('abc@gmail.com', 'wrong password');
      } catch (e) {
        expect(e.message).toEqual('Invalid password');
      }
    });
    it('return the user if correct password is provided', async () => {
      await service.signUp('a@gmail.com', 'password');
      const user = await service.signIn('a@gmail.com', 'password');
      expect(user).toBeDefined();
    });
  });
});
