import { Rate } from '../entities/rate';

export interface RateRepositoryInterface {
  create(rate: Rate): Promise<Rate>;
}
