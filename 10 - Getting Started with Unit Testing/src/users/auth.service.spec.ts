import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  beforeEach(async () => {
    fakeUserService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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
      fakeUserService.find = () =>
        Promise.resolve([
          { id: 1, email: 'abc@gmail.com', password: 'abc' } as User,
        ]);

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
      fakeUserService.find = () => {
        return Promise.resolve([
          {
            id: 1,
            email: 's',
            password: 'abc',
          } as User,
        ]);
      };

      try {
        await service.signIn('chamara1aqqq@gmail.com', 'password');
      } catch (e) {
        expect(e.message).toEqual('Invalid password');
      }
    });
    it('return the user if correct password is provided', async () => {
      fakeUserService.find = () =>
        Promise.resolve([
          {
            id: 1,
            email: 's',
            password:
              'f16478591447729b.360a6e9ca0c6bd925131d927a6aebdc9433f2e6afac6f68ae5be1876d075c95a',
          } as User,
        ]);
      const user = await service.signIn('chamara1aqqq@gmail.com', 'password');
      expect(user).toBeDefined();
    });
  });
});
