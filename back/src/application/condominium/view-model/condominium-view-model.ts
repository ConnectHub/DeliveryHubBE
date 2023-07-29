import { FormatDate } from '../../../infra/utils/format-date';
import { Condominium } from 'src/domain/entities/condominium';
export class CondominiumViewModel {
  static toHttp(condominium: Condominium) {
    return {
      id: condominium.id,
      name: condominium.name,
      createdAt: FormatDate.format(condominium.createdAt),
      updateAt: FormatDate.format(condominium.updatedAt),
      deletedAt: FormatDate.format(condominium.deletedAt),
      key: condominium.id,
      label: condominium.name,
      value: condominium.id,
    };
  }
}
