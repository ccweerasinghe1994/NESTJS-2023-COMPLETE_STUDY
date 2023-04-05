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
## 95 - Ensuring Password Gets Hashed
## 97 - Changing Mock Implementations
## 99 - Testing the Signin Flow
## 101 - Checking Password Comparison
## 102 - More Intelligent Mocks
## 104 - Refactoring to Use Intelligent Mocks
## 105 - Unit Testing a Controller
## 106 - More Mock Implementations
## 108 - Not Super Effective Tests
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