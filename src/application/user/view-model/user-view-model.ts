import { User } from '@/domain/entities/user';

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
    };
  }
}
