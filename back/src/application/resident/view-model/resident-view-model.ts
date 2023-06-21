import { UnformatPhoneNumber } from '../helpers/unformat-phone-number';
import { FormatDate } from '../helpers/format-date';
import { Resident } from 'src/domain/entities/resident';

export class ResidentViewModel {
  static toHttp(resident: Resident) {
    return {
      id: resident.id,
      name: resident.name,
      phoneNumber: UnformatPhoneNumber.format(
        resident?.phoneNumber ?? 'Não possui número'
      ),
      email: resident.email,
      buildingApartment: resident.buildingApartment,
      createdAt: FormatDate.format(resident.createAt),
    };
  }
}

