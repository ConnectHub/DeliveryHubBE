import * as request from 'supertest';
import { Condominium } from 'src/domain/entities/condominium';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CondominiumModule } from '../condominium.module';
import { CreateCondominiumDto } from '../dto/create-condominium.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CondominiumService } from '../condominium.service';
import { CondominiumViewModel } from '../view-model/condominium-view-model';

describe('Condominium (e2e)', () => {
  let app: INestApplication;
  const condominiumService = {
    listAllCondominiums: () =>
      [
        {
          id: '1234',
          name: 'Condominium 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: '5678',
          name: 'Condominium 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ] as Condominium[],
    createCondominium: (condominium: CreateCondominiumDto) => {
      return {
        id: '1234',
        name: condominium.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as Condominium;
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CondominiumModule],
    })
      .overrideProvider(CondominiumService)
      .useValue(condominiumService)
      .compile();

    app = moduleRef.createNestApplication();
    const prismaService = app.get<PrismaService>(PrismaService);
    await prismaService.$connect();
    await app.init();
  });

  describe(`/POST condominium`, () => {
    const createCondominiumDto: CreateCondominiumDto = {
      name: 'Cond test 1',
    };

    const expectOutput = CondominiumViewModel.toHttp(
      condominiumService.createCondominium(createCondominiumDto),
    );
    it('should create a condominium', () => {
      return request(app.getHttpServer())
        .post('/condominium/create/')
        .send(createCondominiumDto)
        .expect(201)
        .expect((res) => {
          expect(JSON.stringify(res.body)).toBe(JSON.stringify(expectOutput));
        });
    });
  });

  describe(`/GET condominium`, () => {
    it('should return a list of condominiums', () => {
      const expectOutput = condominiumService
        .listAllCondominiums()
        .map(CondominiumViewModel.toHttp);
      return request(app.getHttpServer())
        .get('/condominium/list')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(expect.arrayContaining(expectOutput));
        });
    });
  });

  afterAll(async () => {
    await app.close();
    const prismaService = app.get<PrismaService>(PrismaService);
    await prismaService.$disconnect();
  });
});
