
#  Nest Architecture Services and Repositories

## 21 - Services and Repositories

![alt text](./Assets/images/set-01/39.png)
![alt text](./Assets/images/set-01/40.png)
![alt text](./Assets/images/set-01/41.png)
## 22 - Implementing a Repository

\src\messages\message.repository.ts
```ts
import { readFile } from 'fs/promises';
export class MessageRepository {
  // 1. Add a create() method to the repository
  async create(message: string) {}
  // 2. Add a find() method to the repository
  async find() {}
  // 3. Add a findOne() method to the repository
  async findOne(id: string) {
    console.log(id);
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages[id];
  }
}
```
## 23 - Reading and Writing to a Storage File
```ts
import { readFile, writeFile } from 'fs/promises';

export class MessageRepository {
  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const id = Math.floor(Math.random() * 1000);
    messages[id] = { id, message: content };
    await writeFile('messages.json', JSON.stringify(messages));
    return id;
  }

  async find() {
    const contents = await readFile('messages.json', 'utf8');
    return JSON.parse(contents);
  }

  async findOne(id: string) {
    console.log(id);
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages[id];
  }
}
```
## 24 - Implementing a Service
```ts
import { MessageRepository } from './message.repository';

export class MessagesService {
  messagesRepository: MessageRepository;

  constructor() {
    // service is creating it's own dependency
    // this is a bad practice
    this.messagesRepository = new MessageRepository();
  }

  findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  find() {
    return this.messagesRepository.find();
  }

  create(content: string) {
    return this.messagesRepository.create(content);
  }
}

```
## 25 - Manual Testing of the Controller
![alt text](./Assets/images/set-01/42.png)

\src\messages\messages.controller.ts
```ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;
  constructor() {
    this.messagesService = new MessagesService();
  }
  @Get()
  listMessages() {
    return this.messagesService.find();

```

let's make some requests to our API
```ts

### get a message by id
GET http://localhost:3000/messages/93
### create a message
content-type: application/json
{
  "content": "text me"
}
### create a message invalid content
content-type: application/json
{
  "content": 93
}
```
response
```json
{
  "93": {
    "id": 93,
    "message": "hello world"
  },
  "528": {
    "id": 528,
    "message": "text me"
  }
}
```

this is our json file
```json
{
  "93": {
    "id": 93,
    "message": "hello world"
  },
  "528": {
    "id": 528,
    "message": "text me"
  }
}
```
## 26 - Reporting Errors with Exceptions

let's change the controller to handle the error
```ts
r.ts
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
  }
  @Get(':id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      return new NotFoundException('message not found');
    }
    return message;
  }
  @Post()
```

```http
### get a message by id

GET http://localhost:3000/messages/931

```

```json
{
  "response": {
    "statusCode": 404,
    "message": "message not found",
    "error": "Not Found"
  },
  "status": 404,
  "options": {},
  "message": "message not found",
  "name": "NotFoundException"
}
```
## 27 - Understanding Inversion of Control

![alt text](./Assets/images/set-01/43.png)
![alt text](./Assets/images/set-01/44.png)
![alt text](./Assets/images/set-01/45.png)
![alt text](./Assets/images/set-01/46.png)
![alt text](./Assets/images/set-01/47.png)
![alt text](./Assets/images/set-01/48.png)
![alt text](./Assets/images/set-01/49.png)
![alt text](./Assets/images/set-01/50.png)
## 28 - Introduction to Dependency Injection
![alt text](./Assets/images/set-01/51.png)
![alt text](./Assets/images/set-01/52.png)
![alt text](./Assets/images/set-01/53.png)
![alt text](./Assets/images/set-01/54.png)
## 29 - Refactoring to Use Dependency Injection
![alt text](./Assets/images/set-01/55.png)
![alt text](./Assets/images/set-01/56.png)
## 30 - Few More Notes on DI

```ts

import { MessageRepository } from './message.repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MessagesService {
  constructor(public messagesRepository: MessageRepository) {}
  findOne(id: string) {
    return this.messagesRepository.findOne(id);
```
```ts

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}
  @Get()
  listMessages() {
```
```ts
message.repository.ts
import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MessageRepository {
  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
```
```ts
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessageRepository } from './message.repository';
@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessageRepository],
})
export class MessagesModule {}
```


