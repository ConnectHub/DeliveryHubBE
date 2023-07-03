import { UnformatPhoneNumber } from '../helpers/unformat-phone-number';
import { FormatDate } from '../../../infra/utils/format-date';
import { Resident } from 'src/domain/entities/resident';
import { ApiProperty } from '@nestjs/swagger';
export class ResidentViewModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  buildingApartment: string;

  @ApiProperty()
  createdAt: string;

  static toHttp(resident: Resident) {
    return {
      id: resident.id,
      key: resident.id,
      name: resident.name,
      phoneNumber: UnformatPhoneNumber.format(
        resident?.phoneNumber ?? 'Não possui número',
      ),
      email: resident.email,
      buildingApartment: resident.buildingApartment,
      createdAt: FormatDate.format(resident.createAt),
    };
  }
}
