import { User } from '../entities/user';

export interface UserRepositoryInterface {
  findUserByLogin(login: string): Promise<User>;
  updateRate(rateId: string, id: string): Promise<void>;
  create(user: User): Promise<User>;
}
