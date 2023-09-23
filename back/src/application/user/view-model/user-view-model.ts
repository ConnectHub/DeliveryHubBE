import { User } from 'src/domain/entities/user';

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
    };
  }
}
