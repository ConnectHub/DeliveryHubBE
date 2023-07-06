import { Resident } from '../entities/resident';
export interface ResidentRepositoryInterface {
  create(resident: Resident): Promise<Resident>;
  delete(id: string): Promise<void>;
  update(resident: Resident): Promise<Resident>;
  list(condominiumId: string): Promise<Resident[]>;
  findById(id: string): Promise<Resident>;
  findByInfos(data: Resident): Promise<Resident>;
}
