import { Test, TestingModule } from '@nestjs/testing';
import { ResidentController } from '../resident.controller';
import { ResidentService } from '../resident.service';
import { ResidentRepository } from '../repository/resident.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateResidentDto } from '../dto/create-resident.dto';

describe('ResidentController', () => {
  let residentController: ResidentController;
  let residentService: ResidentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidentController],
      providers: [ResidentService, ResidentRepository, PrismaService],
    }).compile();

    residentService = module.get<ResidentService>(ResidentService);
    residentController = module.get<ResidentController>(ResidentController);
  });

  describe('createResident', () => {
    it('should return a resident', async () => {
      const mockResident: CreateResidentDto = {
        name: 'Vini santos',
        condominiumId: '12345678910',
        phoneNumber: '12345678910',
        email: 'vini@test.com',
        buildingApartment: '123',
      };

      jest
        .spyOn(residentService, 'createResident')
        .mockResolvedValue(mockResident);

      const result = await residentController.create(mockResident);

      expect(result).toBe(mockResident);
      expect(residentService.createResident).toHaveBeenCalledWith(mockResident);
      expect(residentService.createResident).toHaveBeenCalledTimes(1);
    });
  });
});
