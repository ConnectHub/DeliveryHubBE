import * as request from 'supertest';
import { Condominium } from 'src/domain/entities/condominium';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CondominiumService } from '../condominium.service';
import { CondominiumModule } from '../condominium.module';

describe('Condominium (e2e)', () => {
  let app: INestApplication;
  const condominiumService = {
    listAllCondominiums: () =>
      [
        {
          id: '1',
          name: 'Condominium 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: '2',
          name: 'Condominium 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ] as Condominium[],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CondominiumModule],
    })
      .overrideProvider(CondominiumService)
      .useValue(condominiumService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET condominium`, () => {
    return request(app.getHttpServer())
      .get('/condominium/list')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();

        for (const item of res.body) {
          expect(item.id).toBeDefined();
          expect(item.name).toBeDefined();
          expect(item.createdAt).toBeDefined();
          expect(item.key).toBeDefined();
          expect(item.label).toBeDefined();
          expect(item.value).toBeDefined();
          expect(item.updatedAt).toBeDefined();
          expect(item.deletedAt).toBeUndefined();
        }
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
