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
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
```
## 43 - Creating an Entity and Repository
## 44 - Viewing a DBs Contents
## 45 - Understanding TypeORM Decorators
## 46 - One Quick Note on Repositories
## 47 - A Few Extra Routes
## 48 - Setting Up Body Validation
## 49 - Manual Route Testing


![alt text](./Assets/images/set-01/84.png)
![alt text](./Assets/images/set-01/85.png)
![alt text](./Assets/images/set-01/86.png)
![alt text](./Assets/images/set-01/87.png)
![alt text](./Assets/images/set-01/88.png)
![alt text](./Assets/images/set-01/89.png)
![alt text](./Assets/images/set-01/90.png)
![alt text](./Assets/images/set-01/91.png)
![alt text](./Assets/images/set-01/92.png)
![alt text](./Assets/images/set-01/93.png)
![alt text](./Assets/images/set-01/94.png)
![alt text](./Assets/images/set-01/95.png)
![alt text](./Assets/images/set-01/96.png)
![alt text](./Assets/images/set-01/97.png)
![alt text](./Assets/images/set-01/98.png)
![alt text](./Assets/images/set-01/99.png)
![alt text](./Assets/images/set-01/100.png)