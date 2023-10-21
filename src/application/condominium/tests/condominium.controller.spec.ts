import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CondominiumController } from '../condominium.controller';
import { CondominiumService } from '../condominium.service';
import { CondominiumRepository } from '../repository/condominium.repository';
import { CreateCondominiumDto } from '../dto/create-condominium.dto';
import { Condominium } from 'src/domain/entities/condominium';
import { CondominiumViewModel } from '../view-model/condominium-view-model';
import { FormatDate } from 'src/infra/utils/format-date';

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
      const mockCreateCondominium: CreateCondominiumDto = {
        name: 'Condominium test',
      };
      const mockCondominiumCreated = {
        id: '123456',
        name: 'Condominium test',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      } as Condominium;

      const formattedCondominium = {
        id: '123456',
        name: 'Condominium test',
        createdAt: FormatDate.format(mockCondominiumCreated.createdAt),
        updatedAt: FormatDate.format(mockCondominiumCreated.updatedAt),
        deletedAt: FormatDate.format(mockCondominiumCreated.deletedAt),
        key: '123456',
        label: 'Condominium test',
        value: '123456',
      };
      jest
        .spyOn(condominiumService, 'createCondominium')
        .mockResolvedValue(mockCondominiumCreated);

      const result = await condominiumService.createCondominium(
        mockCreateCondominium,
      );

      const formattedResult = CondominiumViewModel.toHttp(result);

      expect(result).toEqual(mockCondominiumCreated);
      expect(formattedResult).toEqual(formattedCondominium);
      expect(condominiumService.createCondominium).toHaveBeenCalledWith(
        mockCreateCondominium,
      );
      expect(condominiumService.createCondominium).toHaveBeenCalledTimes(1);
    });
  });
});
