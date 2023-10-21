import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CondominiumController } from '../condominium.controller';
import { CondominiumService } from '../condominium.service';
import { CondominiumRepository } from '../repository/condominium.repository';
import { CreateCondominiumDto } from '../dto/create-condominium.dto';
import { Condominium } from 'src/domain/entities/condominium';
import { CondominiumViewModel } from '../view-model/condominium-view-model';
import { UpdateCondominiumDto } from '../dto/update-condominium.dto';

describe('condominiumController', () => {
  let condominiumService: CondominiumService;
  let condominiumController: CondominiumController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CondominiumController],
      providers: [CondominiumService, CondominiumRepository],
      exports: [CondominiumService],
    }).compile();

    condominiumService = module.get<CondominiumService>(CondominiumService);
    condominiumController = module.get<CondominiumController>(
      CondominiumController,
    );
  });

  describe('create', () => {
    it('should create a condominium', async () => {
      const createCondominiumRequest: CreateCondominiumDto = {
        name: 'Condominium test',
      };
      const mockCondominiumCreated = {
        id: '123456',
        name: 'Condominium test',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      } as Condominium;
      const formattedCondominium = CondominiumViewModel.toHttp(
        mockCondominiumCreated,
      );
      jest
        .spyOn(condominiumService, 'createCondominium')
        .mockResolvedValue(mockCondominiumCreated);

      const result = await condominiumController.create(
        createCondominiumRequest,
      );
      expect(result).toEqual(formattedCondominium);
      expect(condominiumService.createCondominium).toHaveBeenCalledWith(
        createCondominiumRequest,
      );
      expect(condominiumService.createCondominium).toHaveBeenCalledTimes(1);
    });
  });
  describe('update', () => {
    it('should update a condominium', async () => {
      const condId = '123456';
      const updateCondominiumRequest: UpdateCondominiumDto = {
        id: condId,
        name: 'Condominium test UPDATE',
      };
      const mockCondominium = {
        id: condId,
        name: 'Condominium test',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as Condominium;
      const formattedUpdatedCondominium =
        CondominiumViewModel.toHttp(mockCondominium);
      jest
        .spyOn(condominiumService, 'updateCondominium')
        .mockResolvedValue(mockCondominium);

      const result = await condominiumController.update(
        updateCondominiumRequest,
      );
      expect(result).toEqual(formattedUpdatedCondominium);
      expect(condominiumService.updateCondominium).toHaveBeenCalledWith(
        updateCondominiumRequest,
      );
      expect(condominiumService.updateCondominium).toHaveBeenCalledTimes(1);
    });
  });
  describe('list', () => {
    it('should return a list of Condominiums', async () => {
      const mockCondominiumList = [
        {
          id: '123456',
          name: 'Condominium test 1',
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: '654321',
          name: 'Condominium test 2',
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      ] as Condominium[];

      const formattedCondominiumsList = mockCondominiumList.map(
        CondominiumViewModel.toHttp,
      );
      jest
        .spyOn(condominiumService, 'listAllCondominiums')
        .mockResolvedValue(mockCondominiumList);

      const result = await condominiumController.list();
      expect(result).toEqual(formattedCondominiumsList);
      expect(condominiumService.listAllCondominiums).toHaveBeenCalledTimes(1);
    });
  });
  describe('findById', () => {
    it('should return a Condominium', async () => {
      const mockId = '123456';
      const mockCondominium: Condominium = {
        id: mockId,
        name: 'Condominium test',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      };
      jest
        .spyOn(condominiumService, 'findById')
        .mockResolvedValue(mockCondominium);

      const result = condominiumController.findById(mockId);
      const formattedCondominium = CondominiumViewModel.toHttp(mockCondominium);

      expect(result).resolves.toEqual(formattedCondominium);
      expect(condominiumService.findById).toHaveBeenCalledWith(mockId);
      expect(condominiumService.findById).toHaveBeenCalledTimes(1);
    });
  });
  describe('delete', () => {
    it('should delete a Condominium', async () => {
      const mockId = '123456';
      jest.spyOn(condominiumService, 'deleteCondominium').mockResolvedValue();

      const result = condominiumController.delete(mockId);

      expect(result).resolves.toEqual(undefined);
      expect(condominiumService.deleteCondominium).toHaveBeenCalledWith(mockId);
      expect(condominiumService.deleteCondominium).toHaveBeenCalledTimes(1);
    });
  });
});
