import { User } from '@/domain/entities/user';
import { UserRepositoryInterface } from '@/domain/repositories/user';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schemas } from '@/infra/drizzle/drizzle.module';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @Inject('DB')
    private readonly db: PostgresJsDatabase<typeof schemas>,
  ) {}

  async findUserByLogin(login: string): Promise<User> {
    return await this.db.query.userSchema.findFirst({
      where(fields) {
        return eq(fields.login, login);
      },
      with: {
        rate: true,
      },
    });
  }

  async updateRate(rateId: string, id: string): Promise<void> {
    await this.db
      .update(schemas.userSchema)
      .set({
        rateId,
      })
      .where(eq(schemas.userSchema.id, id));
  }

  async create(user: User): Promise<User> {
    await this.db.insert(schemas.userSchema).values({
      condominiumId: user.condominiumId,
      login: user.login,
      name: user.name,
      password: user.password,
      roles: user.roles,
    });
    return await this.findUserByLogin(user.login);
  }
}
