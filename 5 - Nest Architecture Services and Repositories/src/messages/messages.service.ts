import { MessageRepository } from './message.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(public messagesRepository: MessageRepository) {}

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
