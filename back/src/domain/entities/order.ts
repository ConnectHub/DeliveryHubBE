export enum Status {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export interface Order {
  id?: string;
  url?: string;
  code?: string;
  status?: Status;
  sender: string;
  // addresseeId: string;
  receiptDateHour?: Date;
  deletedAt?: Date;
  addressee?: {
    phoneNumber: string;
  };
}
