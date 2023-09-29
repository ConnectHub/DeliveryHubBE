import { Condominium } from '../entities/condominium';

export interface CondominiumRepositoryInterface {
  create(condominium: Condominium): Promise<Condominium>;
  update(condominium: Condominium): Promise<Condominium>;
  delete(id: string): Promise<void>;
  list(): Promise<Condominium[]>;
}
