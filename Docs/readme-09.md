# Authentication From Scratch

## 69 - Authentication Overview 

![alt text](./Assets/images/set-02/22.png)
![alt text](./Assets/images/set-02/23.png)
![alt text](./Assets/images/set-02/24.png)
![alt text](./Assets/images/set-02/25.png)
![alt text](./Assets/images/set-02/26.png)
![alt text](./Assets/images/set-02/27.png)
## 70 - Reminder on Service Setup
![alt text](./Assets/images/set-02/28.png)
![alt text](./Assets/images/set-02/29.png)
![alt text](./Assets/images/set-02/30.png)

let's create a auth service

```ts
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
}
```

```ts
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
@Module({
    imports: [            // Import the TypeOrmModule and pass the User entity to it
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UsersController],  // Add the UsersController to the list of controllers
    providers: [UsersService, AuthService]  // Add the UsersService and AuthService to the list of providers
})

```
## 71 - Implementing Signup Functionality
```ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
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
    //   create a new user and save them to the db
    //   return the user
  }
  signIn(email: string, password: string) {}
}
```
## 72 - Optional Understanding Password Hashing
![alt text](./Assets/images/set-02/31.png)
![alt text](./Assets/images/set-02/32.png)
![alt text](./Assets/images/set-02/33.png)
![alt text](./Assets/images/set-02/34.png)
![alt text](./Assets/images/set-02/35.png)
![alt text](./Assets/images/set-02/36.png)
![alt text](./Assets/images/set-02/37.png)
![alt text](./Assets/images/set-02/38.png)
![alt text](./Assets/images/set-02/39.png)
![alt text](./Assets/images/set-02/40.png)
![alt text](./Assets/images/set-02/41.png)
![alt text](./Assets/images/set-02/42.png)
![alt text](./Assets/images/set-02/43.png)
![alt text](./Assets/images/set-02/44.png)
![alt text](./Assets/images/set-02/45.png)
![alt text](./Assets/images/set-02/46.png)
## 73 - Salting and Hashing the Password
```ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
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
  }
```
## 74 - Creating a User
```ts
const hash = (await scrypt(password, salt, 32)) as Buffer;
    // join the salt and the hash together
    const result = salt + '.' + hash.toString('hex');
    //   create a new user and save them to the db
    //   return the user
    return await this.usersService.create(email, result);
  }
```

let's use it in the controller

```ts
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
@Controller('/auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return this.authService.signUp(email, password);
  }
  @Get('/:id')
```

```http
### CREATE A NEW USER
POST localhost:3000/auth/signup
content-type: application/json
{
  "email": "chamara1@gmail.com",
  "password": "password"
}
```

data base is updated
```json
[
  {
    "id": 9,
    "email": "chamara@gmail.com",
    "password": "111111"
  },
  {
    "id": 10,
    "email": "abc@email.com",
    "password": "password"
  },
  {
    "id": 11,
    "email": "abc@email.com",
    "password": "password"
  },
  {
    "id": 12,
    "email": "chamara1@gmail.com",
    "password": "7fead9ba0a2d2e5c.64d509dbd65e3da3c2df9d5321338628d251a7832208332a42cc0a9f73b75ae4"
  },
  {
    "id": 13,
    "email": "chamara1a@gmail.com",
    "password": "e1dc864c68c1404a.4dffe7a4631d25932f4e56bb1b637a54d01cce94b42fdbecda75e975ba196da7"
  },
  {
    "id": 14,
    "email": "chamara1aqq@gmail.com",
    "password": "91dd936bcca07f56.42d3a348449cd90e3a6be75b6ee34e12f028557f1ade8541b5470d0c16c9d175"
  }
]
```
## 75 - Handling User Sign In


![alt text](./Assets/images/set-02/47.png)
![alt text](./Assets/images/set-02/48.png)
```ts
    return await this.usersService.create(email, result);
  }
  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }
}
```

```ts
    private authService: AuthService,
  ) {}
  @Post('/signin')
  signIn(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return this.authService.signIn(email, password);
  }
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
```

test it

```http
### SIGNIN A USER
POST localhost:3000/auth/signin
content-type: application/json
{
  "email": "chamara1aqq@gmail.com",
  "password": "password"
}
```


![alt text](./Assets/images/set-02/49.png)
## 76 - Setting up Sessions
![alt text](./Assets/images/set-02/50.png)
let's install the session package
```bash
npm install cookie-session @types/cookie-session 
```

setup the session in the main.ts file

```ts
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdfasdf'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
```


## 77 - Changing and Fetching Session Data
```ts
  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }

```

we can test it

```http
### SET A COLOR
GET localhost:3000/auth/colors/blue

### GET A COLOR
GET localhost:3000/auth/colors
```

## 78 - Signing in a User
## 79 - Getting the Current User
## 80 - Signing Out a User
## 81 - Two Automation Tools
## 82 - Custom Param Decorators
## 83 - Why a Decorator and Interceptor
## 84 - Communicating from Interceptor to Decorator
## 86 - Connecting an Interceptor to Dependency Injection
## 87 - Globally Scoped Interceptors
## 88 - Preventing Access with Authentication Guards




![alt text](./Assets/images/set-02/51.png)
![alt text](./Assets/images/set-02/52.png)
![alt text](./Assets/images/set-02/53.png)
![alt text](./Assets/images/set-02/54.png)
![alt text](./Assets/images/set-02/55.png)
![alt text](./Assets/images/set-02/56.png)
![alt text](./Assets/images/set-02/57.png)
![alt text](./Assets/images/set-02/58.png)
![alt text](./Assets/images/set-02/59.png)
![alt text](./Assets/images/set-02/60.png)
![alt text](./Assets/images/set-02/61.png)
![alt text](./Assets/images/set-02/62.png)
![alt text](./Assets/images/set-02/63.png)
![alt text](./Assets/images/set-02/64.png)
![alt text](./Assets/images/set-02/65.png)
![alt text](./Assets/images/set-02/66.png)
![alt text](./Assets/images/set-02/67.png)
![alt text](./Assets/images/set-02/68.png)
![alt text](./Assets/images/set-02/69.png)
![alt text](./Assets/images/set-02/70.png)
![alt text](./Assets/images/set-02/71.png)
![alt text](./Assets/images/set-02/72.png)
![alt text](./Assets/images/set-02/73.png)
![alt text](./Assets/images/set-02/74.png)
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