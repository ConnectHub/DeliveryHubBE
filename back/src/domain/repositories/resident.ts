import { Resident } from '../entities/resident';
export interface ResidentRepositoryInterface {
  create(resident: Resident): Promise<Resident>;
  delete(id: string): Promise<void>;
  update(resident: Resident): Promise<Resident>;
  list(): Promise<Resident[]>;
  findByPhoneNumber(phoneNumber: string): Promise<Resident>;
  findByName(name: string): Promise<Resident>;
  findByBuildingApartment(name: string): Promise<Resident>;
}
