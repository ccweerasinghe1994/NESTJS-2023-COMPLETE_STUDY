import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
  getMessage(@Param('id') id: string) {
    console.log(id);
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
