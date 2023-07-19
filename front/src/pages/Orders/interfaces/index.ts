export enum Status {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
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
  key: string;
  addresseeId: string;
  sign?: string;
  sender?: string;
  img?: string;
  description?: string;
  trackingCode?: string;
  signDateHour?: string;
}

export interface CreateOrder {
  addresseeId: string;
  sender?: string;
  imgSrc: string | null;
}
