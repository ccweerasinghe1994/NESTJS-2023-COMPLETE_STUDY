# Creating and Saving User Data

## 50 - Creating and Saving a User

let's add the create user method to the user service

```ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }
}

```

let's add the create user method to the user controller

```ts
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
```

let't test it out

```shell
curl -X POST \
  http://localhost:3000/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "abc@email.com",
    "password": "password"
  }'

```

## 51 - Quick Breather and Review
![alt text](./Assets/images/set-01/97.png)
![alt text](./Assets/images/set-01/98.png)
![alt text](./Assets/images/set-01/99.png)
![alt text](./Assets/images/set-01/100.png)
## 52 - More on Create vs Save
let's add logs to the create and save methods

```ts
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User {
  email: string;
  @Column()
  password: string;
  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed user with id', this.id);
  }
}
```

![alt text](./Assets/images/set-02/1.png)
![alt text](./Assets/images/set-02/2.png)
## 54 - Querying for Data 
let's add the find and findOne methods to the user service

```ts
  find(email: string) {
    return this.usersRepository.find({
      where: { email },
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }
```
## 55 - Updating Data
let's add the update method to the user service

```ts
  
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }
}
```

![alt text](./Assets/images/set-02/3.png)
![alt text](./Assets/images/set-02/4.png)
![alt text](./Assets/images/set-02/5.png)

## 56 - Removing Users

let's remove the user

```ts
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.usersRepository.remove(user);
  }
```
![alt text](./Assets/images/set-02/6.png)
## 57 - Finding and Filtering Records
let's add find and findAllUsers methods

```ts
 @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }
```

test this 
```http

### FIND A USER
GET localhost:3000/auth/8

### FIND ALL USER
GET localhost:3000/auth?email=abc@email.com

```

```http

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 113
ETag: W/"71-mNUTezQZ+dgidAMK3STdVnt1paE"
Date: Mon, 03 Apr 2023 07:58:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[
  {
    "id": 10,
    "email": "abc@email.com",
    "password": "password"
  },
  {
    "id": 11,
    "email": "abc@email.com",
    "password": "password"
  }
]
Response file saved.
> 2023-04-03T132829.200.json

Response code: 200 (OK); Time: 27ms (27 ms); Content length: 113 bytes (113 B)

```

```http
GET http://localhost:3000/auth/8

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 53
ETag: W/"35-NVuJhBso/XBQ4ucScERtgPiglpg"
Date: Mon, 03 Apr 2023 07:51:59 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "id": 8,
  "email": "abc@email.lk",
  "password": "password"
}
Response file saved.
> 2023-04-03T132159.200.json

Response code: 200 (OK); Time: 9ms (9 ms); Content length: 53 bytes (53 B)

```
## 58 - Removing Records
```ts
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
```
test this 
```http
DELETE http://localhost:3000/auth/8

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-LC3ziy5Zc44zsTsx4R9e1Jqr2EA"
Date: Mon, 03 Apr 2023 10:16:34 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "email": "abc@email.lk",
  "password": "password"
}

Response code: 200 (OK); Time: 86ms (86 ms); Content length: 46 bytes (46 B)
```
## 59 - Updating Records

![alt text](./Assets/images/set-02/7.png)
![alt text](./Assets/images/set-02/8.png)

small change in create user dto 
```ts
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
```

update user dto
```ts

import { IsEmail, IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  password: string;
}
```

user controller 

```ts

  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('/auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return this.usersService.create(email, password);
  }
  @Get('/:id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
```
let's test this

```http
### DELETE A USER
DELETE localhost:3000/auth/8
### UPDATE A USER
PATCH localhost:3000/auth/9
content-type: application/json
{
  "email": "chamara@gmail.com",
  "password": "111111"
}
```
## 60 - A Few Notes on Exceptions

![alt text](./Assets/images/set-02/9.png)
![alt text](./Assets/images/set-02/10.png)
![alt text](./Assets/images/set-02/11.png)
![alt text](./Assets/images/set-02/12.png)
![alt text](./Assets/images/set-02/13.png)
![alt text](./Assets/images/set-02/14.png)
![alt text](./Assets/images/set-02/15.png)
![alt text](./Assets/images/set-02/16.png)
![alt text](./Assets/images/set-02/17.png)
![alt text](./Assets/images/set-02/18.png)
![alt text](./Assets/images/set-02/19.png)
![alt text](./Assets/images/set-02/20.png)
![alt text](./Assets/images/set-02/21.png)
![alt text](./Assets/images/set-02/22.png)
![alt text](./Assets/images/set-02/23.png)
![alt text](./Assets/images/set-02/24.png)
![alt text](./Assets/images/set-02/25.png)
![alt text](./Assets/images/set-02/26.png)
![alt text](./Assets/images/set-02/27.png)
![alt text](./Assets/images/set-02/28.png)
![alt text](./Assets/images/set-02/29.png)
![alt text](./Assets/images/set-02/30.png)
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
![alt text](./Assets/images/set-02/47.png)
![alt text](./Assets/images/set-02/48.png)
![alt text](./Assets/images/set-02/49.png)
![alt text](./Assets/images/set-02/50.png)
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