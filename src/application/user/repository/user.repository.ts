import { Injectable } from '@nestjs/common';
import { User } from '@/domain/entities/user';
import { UserRepositoryInterface } from '@/domain/repositories/user';
import { PrismaService } from '@/infra/prisma/prisma.service';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    });
  }
  async updateRate(rateId: string, id: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        rateId,
      },
    });
  }
  async findUserByLogin(login: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { login },
    });
  }
}
