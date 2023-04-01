import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

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
  getMessage(@Param('id') id: string) {
    console.log(id);
    return {
      id: 1,
      text: 'Message 1',
    };
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
    return {
      id: 1,
      content: 'hello world',
    };
  }
}
