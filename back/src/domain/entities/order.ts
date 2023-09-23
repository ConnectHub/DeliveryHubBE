import { Status } from '@prisma/client';
import { Resident } from './resident';

export interface Order {
  id?: string;
  url?: string;
  code: string | undefined | null;
  status?: Status;
  sender: string;
  addresseeId: string;
  sign?: string;
  receiptDateHour?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  addressee?: Resident;
  img?: string;
  description?: string;
  trackingCode?: string;
  signDateHour?: Date;
}
