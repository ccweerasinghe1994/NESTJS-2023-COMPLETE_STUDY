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
## 72 - Optional Understanding Password Hashing
## 73 - Salting and Hashing the Password
## 74 - Creating a User
## 75 - Handling User Sign In
## 76 - Setting up Sessions
## 77 - Changing and Fetching Session Data
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