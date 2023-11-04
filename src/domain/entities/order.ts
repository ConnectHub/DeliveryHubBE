import { Status } from '@prisma/client';
import { Resident } from './resident';
import { Condominium } from './condominium';

export interface Order {
  id?: string;
  url?: string;
  code: string | undefined | null;
  status?: Status;
  sender: string;
  sign?: string;
  receiptDateHour?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  addresseeId: string;
  addressee?: Resident;
  img?: string;
  description?: string;
  trackingCode?: string;
  signDateHour?: Date;
  condominiumId: string;
  condominium?: Condominium;
}
