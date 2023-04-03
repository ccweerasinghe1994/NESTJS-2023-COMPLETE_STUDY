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
## 54 - Querying for Data 
## 55 - Updating Data
## 56 - Removing Users
## 57 - Finding and Filtering Records
## 58 - Removing Records
## 59 - Updating Records
## 60 - A Few Notes on Exceptions
