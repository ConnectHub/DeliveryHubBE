import { Role } from '@prisma/client';
import { Rate } from './rate';

export interface Condominium {
  id?: string;
  login: string;
  password: string;
  name: string;
  roles: Role[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  rateId?: string;
}
