import { Test, TestingModule } from '@nestjs/testing';
import { ResidentController } from '../resident.controller';
import { ResidentService } from '../resident.service';
import { ResidentRepository } from '../repository/resident.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateResidentDto } from '../dto/create-resident.dto';
import { Resident } from 'src/domain/entities/resident';
import { RequestInterface } from 'src/application/auth/interfaces';
import { ResidentViewModel } from '../view-model/resident-view-model';

describe('ResidentController', () => {
  let residentController: ResidentController;
  let residentService: ResidentService;

  beforeAll(async () => {
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
        name: 'Resident test',
        condominiumId: '12345678910',
        phoneNumber: '12345678910',
        email: 'resident@test.com',
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

    it('should return a list of residents', async () => {
      const condId = '12345';
      const mockListOfResidents = [
        {
          name: 'Resident test 1',
          condominiumId: condId,
          phoneNumber: '(11) 12345-6789',
          buildingApartment: '111',
        },
        {
          name: 'Resident test 2',
          condominiumId: condId,
          phoneNumber: '(22) 12345-6789',
          buildingApartment: '222',
        },
      ] as Resident[];
      const mockReq = {
        user: {
          login: 'test',
          sub: '12345678910',
          condominiumId: condId,
        },
      } as RequestInterface;

      jest
        .spyOn(residentService, 'listAllResidents')
        .mockResolvedValue(mockListOfResidents);

      const result = await residentController.list(mockReq);

      const formattedResult = mockListOfResidents.map((resident) =>
        ResidentViewModel.toHttp(resident),
      );

      expect(result).toEqual(formattedResult);
      expect(residentService.listAllResidents).toHaveBeenCalledWith(
        mockReq.user.condominiumId,
      );
      expect(residentService.listAllResidents).toHaveBeenCalledTimes(1);
    });

    it('should return a resident by id', async () => {
      const mockId = '12345';
      const mockResident = { id: mockId } as Resident;

      jest.spyOn(residentService, 'findById').mockResolvedValue(mockResident);

      const result = await residentController.findById(mockId);

      expect(result).toBe(mockResident);
      expect(residentService.findById).toHaveBeenCalledWith(mockId);
      expect(residentService.findById).toHaveBeenCalledTimes(1);
    });
  });
});
