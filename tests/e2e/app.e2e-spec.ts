import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'presentation/modules/app.module';
import { AuthService } from 'application/services/auth/auth.service';
import { mock } from 'jest-mock-extended';
import { User } from 'domain/entities/user.entity';
import { Ok } from 'presentation/response-types/success.types';

describe('App', () => {
  let app: INestApplication;
  const authService = mock<AuthService>();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /auth/login', () => {
    const user = {
      id: 1,
      active: true,
      email: 'test',
      password: 'test',
      name: 'test',
    } as User;

    jest
      .spyOn(authService, 'validateUser')
      .mockImplementation(() => Promise.resolve(user));

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test',
        password: 'test',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          Ok({
            user,
          }),
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
