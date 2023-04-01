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
