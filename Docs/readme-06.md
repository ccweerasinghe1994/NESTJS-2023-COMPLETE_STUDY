# 8 - Persisting Data with TypeORM

## 41 - Persistent Data with Nest

![alt text](./Assets/images/set-01/76.png)
![alt text](./Assets/images/set-01/77.png)

```shell
 npm i @nestjs/typeorm typeorm sqlite3 
```

![alt text](./Assets/images/set-01/78.png)
![alt text](./Assets/images/set-01/79.png)
## 42 - Setting Up a Database Connection
![alt text](./Assets/images/set-01/80.png)
![alt text](./Assets/images/set-01/81.png)
![alt text](./Assets/images/set-01/82.png)
![alt text](./Assets/images/set-01/83.png)

```ts
// app.module.ts
// Import the AppService
import { AppService } from './app.service';
// Import the UsersModule
import { UsersModule } from './users/users.module';
// Import the ReportsModule
import { ReportsModule } from './reports/reports.module';
// Import the TypeOrmModule
import { TypeOrmModule } from '@nestjs/typeorm';
// Create the AppModule
@Module({
  // Import the TypeOrmModule with the database configuration
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
    }),
    // Import the UsersModule
    UsersModule,
    // Import the ReportsModule
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
```
## 43 - Creating an Entity and Repository
![alt text](./Assets/images/set-01/84.png)
![alt text](./Assets/images/set-01/85.png)

user entity
```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// 1. Import the decorator functions from the typeorm library
@Entity()
export class User {
  // 2. Apply the @Entity decorator to the User class
  @PrimaryGeneratedColumn()
  id: number;
  // 3. Apply the @PrimaryGeneratedColumn decorator to the id property
  @Column()
  email: string;
  // 4. Apply the @Column decorator to the email property
  @Column()
  password: string;
  // 5. Apply the @Column decorator to the password property
}
```

user module
```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
``` 

app module
```ts
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
@Module({
  imports: [
    // Import the TypeORM module
    TypeOrmModule.forRoot({
      // Specify the database type
      type: 'sqlite',
      // Specify the database file name
      database: 'db.sqlite',
      // Specify the entities to be loaded
      entities: [User],
      // Specify whether to synchronize the database schema with the entities
      synchronize: true,
    }),
    UsersModule,
```

## 44 - Viewing a DBs Contents
report entity
```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
}
```

report module
```ts
import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}

```

add to app module
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Import TypeOrmModule
import { User } from './users/user.entity'; // <-- Import User entity
import { Report } from './reports/report.entity'; // <-- Import Report entity

@Module({
  imports: [ // the imports property defines the modules that are imported by this module
    TypeOrmModule.forRoot({ // this module is imported from TypeOrmModule
      type: 'sqlite', // the database type
      database: 'db.sqlite', // the database name
      entities: [User,Report], // the entities that are part of this module
      synchronize: true, // synchronize the database with the entities
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
final db structure
![alt text](./Assets/images/set-01/86.png)


## 45 - Understanding TypeORM Decorators
![alt text](./Assets/images/set-01/87.png)
![alt text](./Assets/images/set-01/88.png)
![alt text](./Assets/images/set-01/89.png)
## 46 - One Quick Note on Repositories

![alt text](./Assets/images/set-01/90.png)
![alt text](./Assets/images/set-01/91.png)
![alt text](./Assets/images/set-01/92.png)
## 47 - A Few Extra Routes

![alt text](./Assets/images/set-01/93.png)
![alt text](./Assets/images/set-01/94.png)
![alt text](./Assets/images/set-01/95.png)
![alt text](./Assets/images/set-01/96.png)

let's add class-validator
```shell
 npm i class-validator class-transformer 
```

let's add class-transformer
```shell
 npm i class-transformer 
```

let's create the user dto
```ts

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  // @IsEmail() decorator will validate if the input is a valid email address or not
  @IsEmail()
  username: string;
  // @IsString() decorator will validate if the input is a string or not
  @IsString()
  password: string;
}
```


## 48 - Setting Up Body Validation
let's update the user controller
```ts

import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
@Controller('/auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    // @Body() is a decorator that tells Nest to extract the request body and pass it as an argument to this method.
    // The argument's name is 'body' and its type is CreateUserDto.
    // @Body() is a built-in decorator that tells Nest to extract the request body and pass it as an argument to this method.
    console.log(body);
  }
}
```

let's add the validation pipe
```ts
import { NestFactory } from '@nestjs/core'; // NestFactory is used to create an instance of Nest application to which we can attach modules
import { AppModule } from './app.module'; // import the AppModule from the app.module.ts
import { ValidationPipe } from '@nestjs/common'; // import the ValidationPipe from the @nestjs/common library

async function bootstrap() { // define the bootstrap() function as an asynchronous function
  const app = await NestFactory.create(AppModule); // create an instance of the Nest application and pass the AppModule as an argument to the create() function
  app.useGlobalPipes( // use the useGlobalPipes() method to attach the ValidationPipe to the application
    new ValidationPipe({ // create a new instance of the ValidationPipe
      whitelist: true, // enable the whitelist property to only allow properties that are defined in the DTO
    }),
  );
  await app.listen(3000); // start the server and listen on port 3000
}
bootstrap(); // call the bootstrap() function
```

## 49 - Manual Route Testing
let's test the validation
```http
### CREATE A NEW USER
POST localhost:3000/auth/signup
content-type: application/json
{
  "username": "abc@email.com",
  "password": "password"
}
```
