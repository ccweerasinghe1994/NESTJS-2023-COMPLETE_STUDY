import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication system (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles the signup request', () => {
    const email = 'abc111@gmail.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: '123456',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user and get the signin user', async () => {
    const email = 'abcd@gmail.com';
    const user = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: '123456',
      })
      .expect(201);

    const cookie = user.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);
    expect(body.email).toEqual(email);
  });
});
