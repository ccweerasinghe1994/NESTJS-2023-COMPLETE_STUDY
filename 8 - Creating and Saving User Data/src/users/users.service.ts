import { Injectable } from '@nestjs/common';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });
    return this.usersRepository.save(user);
  }

  find(email: string) {
    return this.usersRepository.find({
      where: { email },
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }
}
