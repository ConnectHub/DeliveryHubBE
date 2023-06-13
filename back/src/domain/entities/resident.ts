export interface Resident {
  id?: string;
  name: string;
  condominiumId: string;
  phoneNumber: string;
  email: string;
  buildingApartment: string;
  createAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
