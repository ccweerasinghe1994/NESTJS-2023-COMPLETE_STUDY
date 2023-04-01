import { readFile } from 'fs/promises';

export class MessageRepository {
  async create(message: string) {}

  async find() {}

  async findOne(id: string) {
    console.log(id);
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages[id];
  }
}
