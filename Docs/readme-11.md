# Integration Testing
## 110 - Getting Started with End to End Testing
![alt text](./Assets/images/set-02/75.png)
![alt text](./Assets/images/set-02/76.png)
## 111 - Creating an End to End Test
let's create the test for authentication
```ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication system (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles the signup request', () => {
    const email = 'abc@gmail.com';
    return request(app.getHttpServer()) 
      .post('/auth/signup')
      .send({
        email,
        password: '123456',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
});

```
this is the response
![alt text](./Assets/images/set-02/77.png)
## 112 - App Setup Issues in Spec Files
![alt text](./Assets/images/set-02/80.png)
![alt text](./Assets/images/set-02/78.png)
![alt text](./Assets/images/set-02/79.png)
## 113 - Applying a Globally Scoped Pipe
![alt text](./Assets/images/set-02/81.png)
```ts
import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { APP_PIPE } from '@nestjs/core';
@Module({
  imports: [
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
```

## 114 - Applying a Globally Scoped Middleware

## 115 - Solving Failures Around Repeat Test Runs
## 116 - Creating Separate Test and Dev Databases
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