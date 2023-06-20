import { Status } from '@prisma/client';

export interface Order {
  id?: string;
  url?: string;
  code: string | undefined | null;
  status?: Status;
  sender: string;
  addresseeId: string;
  receiptDateHour?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  addressee?: {
    phoneNumber: string;
    name: string;
  };
}
