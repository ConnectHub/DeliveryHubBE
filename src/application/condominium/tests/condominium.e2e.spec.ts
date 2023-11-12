import * as request from 'supertest';
import { Condominium } from '@/domain/entities/condominium';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CondominiumModule } from '../condominium.module';
import { CreateCondominiumDto } from '../dto/create-condominium.dto';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { CondominiumService } from '../condominium.service';
import { CondominiumViewModel } from '../view-model/condominium-view-model';
import { CondominiumNotFound } from '../errors/condominium-not-found';

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
    findById(id: string) {
      const cond = {
        id: '1234',
        name: 'Condominium 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      if (id !== cond.id) throw new CondominiumNotFound();
      return cond;
    },
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

  describe(`/POST condominium/create`, () => {
    const createCondominiumReq: CreateCondominiumDto = {
      name: 'Cond test 1',
    };

    const expectOutput = CondominiumViewModel.toHttp(
      condominiumService.createCondominium(createCondominiumReq),
    );
    it('should create a condominium', () => {
      return request(app.getHttpServer())
        .post('/condominium/create/')
        .send(createCondominiumReq)
        .expect(201)
        .expect((res) => {
          expect(JSON.stringify(res.body)).toBe(JSON.stringify(expectOutput));
        });
    });
  });

  describe(`/GET condominium/:id`, () => {
    it('should return a condominium', () => {
      const expectOutput = CondominiumViewModel.toHttp(
        condominiumService.findById('1234'),
      );
      return request(app.getHttpServer())
        .get('/condominium/1234')
        .expect(200)
        .expect((res) => {
          expect(JSON.stringify(res.body)).toBe(JSON.stringify(expectOutput));
        });
    });
    it('should return Condominium not found', () => {
      return request(app.getHttpServer())
        .get('/condominium/9999')
        .expect(404)
        .expect((res) => {
          const error = res.body;
          expect(error.message).toEqual('Condominium Not Found');
          expect(error.statusCode).toEqual(404);
        });
    });
  });

  describe(`/GET condominium/list`, () => {
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
