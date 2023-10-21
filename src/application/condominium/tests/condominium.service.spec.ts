import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CondominiumController } from '../condominium.controller';
import { CondominiumService } from '../condominium.service';
import { CondominiumRepository } from '../repository/condominium.repository';
import { Condominium } from 'src/domain/entities/condominium';
import { CondominiumNotFound } from '../errors/condominium-not-found';
import { UpdateCondominiumDto } from '../dto/update-condominium.dto';
import { CreateCondominiumDto } from '../dto/create-condominium.dto';

describe('CondominiumService', () => {
  let condominiumService: CondominiumService;
  let condominiumRepository: CondominiumRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CondominiumController],
      providers: [CondominiumService, CondominiumRepository],
      exports: [CondominiumService],
    }).compile();

    condominiumService = module.get<CondominiumService>(CondominiumService);
    condominiumRepository = module.get<CondominiumRepository>(
      CondominiumRepository,
    );
  });

  describe('createCondominium', () => {
    it('should create a condominium', async () => {
      const mockCondominium: Condominium = {
        id: '123456',
        name: 'string',
        createdAt: new Date(),
      };

      jest
        .spyOn(condominiumRepository, 'create')
        .mockResolvedValueOnce(mockCondominium);

      const result = await condominiumService.createCondominium(
        mockCondominium,
      );

      expect(result).toEqual(mockCondominium);
      expect(condominiumRepository.create).toHaveBeenCalledWith(
        mockCondominium,
      );
      expect(condominiumRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should find a condominium by Id', async () => {
      const mockId = '123456';
      const mockCondominium: Condominium = {
        id: mockId,
        name: 'Condominium test',
      };

      jest
        .spyOn(condominiumRepository, 'findById')
        .mockResolvedValueOnce(mockCondominium);

      const result = await condominiumService.findById(mockId);

      expect(result).toEqual(mockCondominium);
      expect(condominiumRepository.findById).toHaveBeenCalledWith(mockId);
      expect(condominiumRepository.findById).toHaveBeenCalledTimes(1);
    });
    it('should throw an error if condominium is not found', async () => {
      const mockId = '123456';

      jest
        .spyOn(condominiumRepository, 'findById')
        .mockResolvedValueOnce(undefined);
      const result = condominiumService.findById(mockId);

      expect(result).rejects.toThrow(CondominiumNotFound);
      expect(condominiumRepository.findById).toHaveBeenCalledWith(mockId);
    });
  });

  describe('updateCondominium', () => {
    const mockedDate = new Date(2023, 10, 20, 10);
    jest.spyOn(global, 'Date').mockImplementation(() => {
      return mockedDate;
    });

    it('should update a condominium', async () => {
      const newCondominium: CreateCondominiumDto = {
        name: 'Condominium test',
      };
      const createdCondominium = await condominiumService.createCondominium(
        newCondominium,
      );
      const edit: UpdateCondominiumDto = {
        id: createdCondominium.id,
        name: 'EDIT Condominium test',
      };
      const mockEditedCondominium: Condominium = {
        id: createdCondominium.id,
        name: 'EDIT Condominium test',
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
      } as Condominium;
      jest
        .spyOn(condominiumRepository, 'findById')
        .mockResolvedValue(createdCondominium);
      const result = await condominiumService.updateCondominium(edit);

      expect(result).toEqual(mockEditedCondominium);
      expect(condominiumRepository.findById).toHaveBeenCalledWith(
        createdCondominium.id,
      );
    });
    it('should throw an error if condominium is not found', async () => {
      const edit: UpdateCondominiumDto = {
        id: '12341234',
        name: 'Condominium test',
      };
      jest
        .spyOn(condominiumRepository, 'findById')
        .mockResolvedValueOnce(undefined);
      const result = condominiumService.updateCondominium(edit);

      expect(result).rejects.toThrow(CondominiumNotFound);
      expect(condominiumRepository.findById).toHaveBeenCalledWith(edit.id);
    });
  });

  describe('listAllCondominiums', () => {
    it('should list all condominiums', async () => {
      const mockResult = [
        {
          id: '123456',
          name: 'Condominium 1',
        },
        {
          id: '123456',
          name: 'Condominium 2',
        },
      ] as Condominium[];

      jest.spyOn(condominiumRepository, 'list').mockResolvedValue(mockResult);
      const result = await condominiumService.listAllCondominiums();

      expect(result).toEqual(mockResult);
      expect(condominiumRepository.list).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteCondominium', () => {
    it('should delete a condominium', async () => {
      const mockId = '123456';
      const mockCondominium: Condominium = {
        id: mockId,
        name: 'Condominium test',
      };

      jest
        .spyOn(condominiumRepository, 'findById')
        .mockResolvedValue(mockCondominium);
      jest.spyOn(condominiumRepository, 'delete').mockResolvedValue(undefined);

      const result = await condominiumService.deleteCondominium(mockId);

      expect(result).toBeUndefined();
      expect(condominiumRepository.findById).toHaveBeenCalledWith(mockId);
      expect(condominiumRepository.delete).toHaveBeenCalledWith(mockId);
      expect(condominiumRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
