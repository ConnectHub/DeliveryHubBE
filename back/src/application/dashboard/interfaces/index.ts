export class ChartDataInterface {
  status?: string;
  month?: string;
  orderCount?: number;
  value?: number;
  receiptDateHour?: Date;
  condominiumName?: string;
  addressee?: {
    condominium?: {
      name?: string;
    };
    condominiumId?: string;
  };
}
