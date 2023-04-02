import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

type Messages = {
  id: number;
  message: string;
};

@Injectable()
export class MessageRepository {
  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents) as Messages[];
    const id = Math.floor(Math.random() * 1000);
    messages[id] = { id, message: content };
    await writeFile('messages.json', JSON.stringify(messages));
    return id;
  }

  async find() {
    const contents = await readFile('messages.json', 'utf8');
    return JSON.parse(contents) as Messages[];
  }

  async findOne(id: number): Promise<Messages> {
    console.log(id);
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents) as Messages[];
    return messages[+id];
  }
}
