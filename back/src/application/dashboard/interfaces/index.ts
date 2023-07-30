export class ChartDataInterface {
  status?: string;
  month?: string;
  orderCount?: number;
  value?: number;
  receiptDateHour?: Date;
  condominiumName?: string;
  addressee?: {
    condominiumId?: string;
    condominium?: {
      name?: string;
    };
  };
}
