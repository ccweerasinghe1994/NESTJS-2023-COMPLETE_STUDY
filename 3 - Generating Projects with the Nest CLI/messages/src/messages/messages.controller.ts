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
            content: 'hello world'
        }
    }
}
