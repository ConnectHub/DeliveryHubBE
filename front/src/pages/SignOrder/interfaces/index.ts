export enum Status {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
}

export interface ConfirmOrder {
  code: string;
  url: string | undefined;
  signature: string | undefined;
}

export interface Order {
  id: string;
  phoneNumber: string;
  status: string;
  code: string;
  url: string;
  name: string;
  receiptDateHour: string;
  originalStatus: Status;

  addresseeId: string;
}
