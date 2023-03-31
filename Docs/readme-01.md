# Basics of NESTJS

## 4 - Project Setup

![1.png](./Assets/images/set-01/1.png)

```shell
npm i @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata typescript
```

updated package.json

```json
  },
"keywords": [],
"author": "",
"license": "ISC",
"dependencies": {
"@nestjs/common": "^9.3.12",
"@nestjs/core": "^9.3.12",
"@nestjs/platform-express": "^9.3.12",
"reflect-metadata": "^0.1.13",
"typescript": "^5.0.3"
}
}
```

## 5 - TypeScript Configuration

![alt text](./Assets/images/set-01/2.png)
![alt text](./Assets/images/set-01/3.png)
![alt text](./Assets/images/set-01/4.png)
![alt text](./Assets/images/set-01/5.png)
![alt text](./Assets/images/set-01/6.png)
![alt text](./Assets/images/set-01/7.png)

and create a tsconfig file

2 - The Basics of Nest\tsconfig.json

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2017",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## 6 - Creating a Controller

![alt text](./Assets/images/set-01/8.png)
![alt text](./Assets/images/set-01/9.png)
![alt text](./Assets/images/set-01/10.png)
![alt text](./Assets/images/set-01/11.png)

2 - The Basics of Nest\src\main.ts

```ts
import {Module, Controller, Get} from '@nestjs/common';

@Controller()
class AppController {
    @Get()
    getRootRoute() {
        return 'Hello World';
    }
}
```

## 7 - Starting Up a Nest App

let's add a module
2 - The Basics of Nest\src\main.ts

```ts
import {Module, Controller, Get} from '@nestjs/common';
import {NestFactory} from "@nestjs/core";

@Controller()
class AppController {
    return
    'Hello World';
}

}

@Module({controllers: [AppController]})
class AppModule {
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
```

## 8 - File Naming Conventions

![alt text](./Assets/images/set-01/12.png)
![alt text](./Assets/images/set-01/13.png)

let's refactor the code

2 - The Basics of Nest\src\app.controller.ts

```ts
import {Controller, Get} from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    getRootRoute() {
        return 'Hello World';
    }
}
```

2 - The Basics of Nest\src\app.module.ts

```ts
import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";

@Module({controllers: [AppController]})
export class AppModule {
}
```

2 - The Basics of Nest\src\main.ts

```ts
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // other code
```

## 9 - Routing Decorators

![alt text](./Assets/images/set-01/14.png)
![alt text](./Assets/images/set-01/15.png)
![alt text](./Assets/images/set-01/16.png)
![alt text](./Assets/images/set-01/17.png)
![alt text](./Assets/images/set-01/18.png)
![alt text](./Assets/images/set-01/19.png)
![alt text](./Assets/images/set-01/20.png)
![alt text](./Assets/images/set-01/21.png)
![alt text](./Assets/images/set-01/22.png)
![alt text](./Assets/images/set-01/23.png)
![alt text](./Assets/images/set-01/24.png)
![alt text](./Assets/images/set-01/25.png)
![alt text](./Assets/images/set-01/26.png)
![alt text](./Assets/images/set-01/27.png)
![alt text](./Assets/images/set-01/28.png)
![alt text](./Assets/images/set-01/29.png)
![alt text](./Assets/images/set-01/30.png)
![alt text](./Assets/images/set-01/31.png)
![alt text](./Assets/images/set-01/32.png)
![alt text](./Assets/images/set-01/33.png)
![alt text](./Assets/images/set-01/34.png)
![alt text](./Assets/images/set-01/35.png)
![alt text](./Assets/images/set-01/36.png)
![alt text](./Assets/images/set-01/37.png)
![alt text](./Assets/images/set-01/38.png)
![alt text](./Assets/images/set-01/39.png)
![alt text](./Assets/images/set-01/40.png)
![alt text](./Assets/images/set-01/41.png)
![alt text](./Assets/images/set-01/42.png)
![alt text](./Assets/images/set-01/43.png)
![alt text](./Assets/images/set-01/44.png)
![alt text](./Assets/images/set-01/45.png)
![alt text](./Assets/images/set-01/46.png)
![alt text](./Assets/images/set-01/47.png)
![alt text](./Assets/images/set-01/48.png)
![alt text](./Assets/images/set-01/49.png)
![alt text](./Assets/images/set-01/50.png)
![alt text](./Assets/images/set-01/51.png)
![alt text](./Assets/images/set-01/52.png)
![alt text](./Assets/images/set-01/53.png)
![alt text](./Assets/images/set-01/54.png)
![alt text](./Assets/images/set-01/55.png)
![alt text](./Assets/images/set-01/56.png)
![alt text](./Assets/images/set-01/57.png)
![alt text](./Assets/images/set-01/58.png)
![alt text](./Assets/images/set-01/59.png)
![alt text](./Assets/images/set-01/60.png)
![alt text](./Assets/images/set-01/61.png)
![alt text](./Assets/images/set-01/62.png)
![alt text](./Assets/images/set-01/63.png)
![alt text](./Assets/images/set-01/64.png)
![alt text](./Assets/images/set-01/65.png)
![alt text](./Assets/images/set-01/66.png)
![alt text](./Assets/images/set-01/67.png)
![alt text](./Assets/images/set-01/68.png)
![alt text](./Assets/images/set-01/69.png)
![alt text](./Assets/images/set-01/70.png)
![alt text](./Assets/images/set-01/71.png)
![alt text](./Assets/images/set-01/72.png)
![alt text](./Assets/images/set-01/73.png)
![alt text](./Assets/images/set-01/74.png)
![alt text](./Assets/images/set-01/75.png)
![alt text](./Assets/images/set-01/76.png)
![alt text](./Assets/images/set-01/77.png)
![alt text](./Assets/images/set-01/78.png)
![alt text](./Assets/images/set-01/79.png)
![alt text](./Assets/images/set-01/80.png)
![alt text](./Assets/images/set-01/81.png)
![alt text](./Assets/images/set-01/82.png)
![alt text](./Assets/images/set-01/83.png)
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