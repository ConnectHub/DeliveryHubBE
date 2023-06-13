// export enum Status {
//   PENDING,
//   DELIVERED,
//   CANCELED,
// }

import { Status } from '@prisma/client';

export interface Order {
  id?: string;
  url?: string;
  code?: string;
  status?: Status;
  sender: string;
  addresseeId: string;
  receiptDateHour?: Date;
  deletedAt?: Date;
}
