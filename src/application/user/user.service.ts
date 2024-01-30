import { Injectable } from '@nestjs/common';
import { User } from '@/domain/entities/user';
import { genSalt, hash } from 'bcrypt';
import { UserRepository } from './repository/user.repository.drizzle';
import { UserAlreadyExist } from './errors/user-already-exists';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserByLogin(login: string): Promise<User> {
    return await this.userRepository.findUserByLogin(login);
  }

  async updateRate(rateId: string, id: string): Promise<void> {
    await this.userRepository.updateRate(rateId, id);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await genSalt(saltOrRounds);
    return await hash(password, salt);
  }

  async createUser(user: User): Promise<User> {
    const prevUser = await this.findUserByLogin(user.login);
    if (prevUser) throw new UserAlreadyExist();
    user.password = await this.hashPassword(user.password);
    return await this.userRepository.create(user);
  }
}
