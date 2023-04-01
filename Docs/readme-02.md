# Generating Projects with the Nest CLI

## 10 - App Setup

```shell
npm i -g @nestjs/cli

nest new messages
```

![alt text](./Assets/images/set-01/14.png)
![alt text](./Assets/images/set-01/15.png)
![alt text](./Assets/images/set-01/16.png)
![alt text](./Assets/images/set-01/17.png)
![alt text](./Assets/images/set-01/18.png)
![alt text](./Assets/images/set-01/19.png)
![alt text](./Assets/images/set-01/20.png)
![alt text](./Assets/images/set-01/21.png)
![alt text](./Assets/images/set-01/22.png)

## 11 - Using the Nest CLI to Generate Files

```shell
nest generate module messages
```

it will generate a module called messages

```ts
import {Module} from '@nestjs/common';

@Module({})
export class MessagesModule {
}
```

let's use it in the app module

```ts
import {Module} from '@nestjs/common';
import {MessagesModule} from './messages/messages.module';

@Module({
    imports: [MessagesModule],
})
export class AppModule {
}
```

## 12 - More on Generating Files

![alt text](./Assets/images/set-01/23.png)
let's generate a controller

```shell
nest generate controller messages/messages --flat
```

--flat means that the controller will be created in the same folder as the module
messages/messages means that the controller will be created in the messages folder

## 13 - Adding Routing Logic

![alt text](./Assets/images/set-01/24.png)
![alt text](./Assets/images/set-01/25.png)
![alt text](./Assets/images/set-01/26.png)
![alt text](./Assets/images/set-01/27.png)
messages.controller.ts

```ts
import {Controller, Get, Post} from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages() {
        return [
            {
                id: 1,
                text: 'Message 1'
            },
            {
                id: 2,
                text: 'Message 2'
            }
        ]
    }

    @Get(':id')
    getMessage() {
        return {
            id: 1,
            text: 'Message 1'
        }
    }

    @Post()
    createMessage() {
        return {
            id: 1,
            text: 'Message 1'
        }
    }
}

```

## 14 - Optional Postman Setup

![alt text](./Assets/images/set-01/28.png)

## 15 - Optional VSCode REST Client Extension

```http request

### list al the messages
GET http://localhost:3000/messages

### get a message by id
GET http://localhost:3000/messages/1

### create a message
POST http://localhost:3000/messages
content-type: application/json
{
  "content": "hello world"
}

```

# 4 - Validating Request Data with Pipes

## 16 - Accessing Request Data with Decorators
![alt text](./Assets/images/set-01/29.png)
```ts
import {Body, Controller, Get, Post} from '@nestjs/common';

interface BodyI {
    content: string;
}

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages() {
        return [
            {
                id: 1,
                text: 'Message 1',
            },
            {
                id: 2,
                text: 'Message 2',
            },
        ];
    }

    @Get(':id')
    getMessage() {
        return {
            id: 1,
            text: 'Message 1',
        };
    }

    @Post()
    createMessage(@Body() body: BodyI) {
        console.log(body);
        return {
            id: 1,
            content: 'hello world',
        };
    }
}

```

adding the @Body() decorator will automatically parse the body of the request and return it as an object
adding the @type() decorator will automatically parse the body of the request and return it as an object
```ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
interface BodyI {
  content: string;
  }
  @Get(':id')
  getMessage(@Param('id') id: string) {
    console.log(id);
    return {
      id: 1,
      text: 'Message 1',
```


## 17 - Using Pipes for Validation
![alt text](./Assets/images/set-01/31.png)
![alt text](./Assets/images/set-01/32.png)

```ts
import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

```

## 18 - Adding Validation Rules
add the following packages to the project

```shell
npm i class-validator class-transformer
```

[class validator](https://www.npmjs.com/package/class-validator)
[class transformer](https://www.npmjs.com/package/class-transformer)


![alt text](./Assets/images/set-01/33.png)
![alt text](./Assets/images/set-01/34.png)
![alt text](./Assets/images/set-01/35.png)

let's create the dto

```ts
import { IsString } from 'class-validator';
export class CreateMessageDto {
  @IsString()
  content: string;
}

```

let's use it in the controller

```ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
@Controller('messages')
export class MessagesController {
  }
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
    return {
      id: 1,
```

let's test it 

4 - Validating Request Data with Pipes\request.http
```http request
{
  "content": "hello world"
}
### create a message invalid content
POST http://localhost:3000/messages
content-type: application/json
{
  "content": 123
}
```

## 19 - Behind the Scenes of Validation

class-transformer documentation [🔥 here](https://github.com/typestack/class-transformer#what-is-class-transformer)

![alt text](./Assets/images/set-01/36.png)
![alt text](./Assets/images/set-01/37.png)
## 20 - How Type Info is Preserved
```js
// We can use the @Body() decorator to access the body of the request. The @Body()
// decorator will automatically deserialize the JSON body of the request into an
// instance of the CreateMessageDto class.

__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "createMessage", null);
```

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