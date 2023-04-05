# Getting Started with Unit Testing 
## 89 - Testing Overview

![alt text](./Assets/images/set-02/63.png)
![alt text](./Assets/images/set-02/64.png)
![alt text](./Assets/images/set-02/65.png)
![alt text](./Assets/images/set-02/66.png)
![alt text](./Assets/images/set-02/67.png)
## 90 - Testing Setup

![alt text](./Assets/images/set-02/68.png)

```ts
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

it('can create an instance of auth service', async () => {
  const fakeUserService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
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

  const service = module.get<AuthService>(AuthService);

  expect(service).toBeDefined();
});
```
## 91 - Yes Testing is Confusing
![alt text](./Assets/images/set-02/69.png)
![alt text](./Assets/images/set-02/70.png)
![alt text](./Assets/images/set-02/71.png)
![alt text](./Assets/images/set-02/72.png)
![alt text](./Assets/images/set-02/73.png)
## 92 - Getting TypeScript to Help With Mocks


![alt text](./Assets/images/set-02/74.png)


let's add some types to our fakeUserService
```ts
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';

it('can create an instance of auth service', async () => {
  const fakeUserService: Partial<UsersService> = {
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

  const service = module.get<AuthService>(AuthService);

  expect(service).toBeDefined();
});

```
## 94 - Improving File Layout
let's refactor our test file to be more organized
```ts
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const fakeUserService: Partial<UsersService> = {
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
});

```
## 95 - Ensuring Password Gets Hashed
```ts
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signUp('asdasd@gmail.com', 'asdasd');
    expect(user.password).not.toEqual('asdasd');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
});
```
## 97 - Changing Mock Implementations
```ts
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
```
## 99 - Testing the Signin Flow
```ts
  describe('signin', () => {
    it('throws if an invalid email is provided', async () => {
      try {
        await service.signIn('abc', 'abc');
      } catch (e) {
        expect(e.message).toEqual('Invalid email');
      }
    });
  });
```
## 101 - Checking Password Comparison
```ts

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
```
## 102 - More Intelligent Mocks
```ts
10 - Getting Started with Unit Testing\src\users\auth.service.spec.ts
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
      }
    });
    it('return the user if correct password is provided', async () => {
      await service.signUp('a@gmail.com', 'password');
      const user = await service.signIn('a@gmail.com', 'password');
      expect(user).toBeDefined();
    });
  });
```
## 104 - Refactoring to Use Intelligent Mocks
```ts
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
```
## 105 - Unit Testing a Controller
```ts
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
```

## 106 - More Mock Implementations
```ts
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

```
## 108 - Not Super Effective Tests
```ts
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
```
## 109 - Testing the Signin Method


![alt text](./Assets/images/set-02/75.png)
![alt text](./Assets/images/set-02/76.png)
![alt text](./Assets/images/set-02/77.png)
![alt text](./Assets/images/set-02/78.png)
![alt text](./Assets/images/set-02/79.png)
![alt text](./Assets/images/set-02/80.png)
![alt text](./Assets/images/set-02/81.png)
![alt text](./Assets/images/set-02/82.png)
![alt text](./Assets/images/set-02/83.png)
![alt text](./Assets/images/set-02/84.png)
![alt text](./Assets/images/set-02/85.png)
![alt text](./Assets/images/set-02/86.png)
![alt text](./Assets/images/set-02/87.png)
![alt text](./Assets/images/set-02/88.png)
![alt text](./Assets/images/set-02/89.png)
![alt text](./Assets/images/set-02/90.png)
![alt text](./Assets/images/set-02/91.png)
![alt text](./Assets/images/set-02/92.png)
![alt text](./Assets/images/set-02/93.png)
![alt text](./Assets/images/set-02/94.png)
![alt text](./Assets/images/set-02/95.png)
![alt text](./Assets/images/set-02/96.png)
![alt text](./Assets/images/set-02/97.png)
![alt text](./Assets/images/set-02/98.png)
![alt text](./Assets/images/set-02/99.png)
![alt text](./Assets/images/set-02/100.png)