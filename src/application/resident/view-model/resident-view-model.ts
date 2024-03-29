import { FormatDate } from '../../../infra/utils/format-date';
import { Resident } from '@/domain/entities/resident';
import { ApiProperty } from '@nestjs/swagger';
import { FormatPhoneNumber } from '@/infra/utils/format-phone-number';
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
      name: resident.name,
      phoneNumber: FormatPhoneNumber.unFormat(
        resident?.phoneNumber ?? 'Não possui número',
      ),
      email: resident.email,
      buildingApartment: resident.buildingApartment,
      createdAt: FormatDate.format(resident.createAt),
      key: resident.id,
      value: resident.id,
      label: resident.name,
    };
  }
}
