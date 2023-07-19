import { Role } from '@prisma/client';

export interface Condominium {
  id?: string;
  login: string;
  password: string;
  name: string;
  roles: Role[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
