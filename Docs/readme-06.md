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
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User,Report],
      synchronize: true,
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
## 48 - Setting Up Body Validation
## 49 - Manual Route Testing

![alt text](./Assets/images/set-01/93.png)
![alt text](./Assets/images/set-01/94.png)
![alt text](./Assets/images/set-01/95.png)
![alt text](./Assets/images/set-01/96.png)
![alt text](./Assets/images/set-01/97.png)
![alt text](./Assets/images/set-01/98.png)
![alt text](./Assets/images/set-01/99.png)
![alt text](./Assets/images/set-01/100.png)