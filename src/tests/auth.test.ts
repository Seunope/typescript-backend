import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import { AuthUser, CreateUserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
        username: ' tolu007',
        firstName: 'Ope',
        lastName: 'Doe',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        id: 1,
        email: userData.email,
        username: userData.username,
        lastName: userData.lastName,
        firstName: userData.firstName,
        password: await bcrypt.hash(userData.password, 10),
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer()).post(`${authRoute.path}/signup`).send(userData).expect(201);
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: AuthUser = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue({
        id: 1,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });
      //const authToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjM2ODEyNTA1LCJleHAiOjE2MzY4MTYxMDV9.vuvVPnMloZr1Ja2DAJqHnnnRNfvTc4HEYY2lVyyZnuE'

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([authRoute]);
      return (
        request(app.getServer())
          .post(`${authRoute.path}/login`)
          .send(userData)
          // .set(
          //   'authorization',
          //   `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjM2ODEyNTA1LCJleHAiOjE2MzY4MTYxMDV9.vuvVPnMloZr1Ja2DAJqHnnnRNfvTc4HEYY2lVyyZnuE`,
          // )
          .expect('Set-Cookie', /^Authorization=.+/)
      );
    });
  });

  // describe('[POST] /logout', () => {
  //   it('logout Set-Cookie Authorization=; Max-age=0', async () => {
  //     const authRoute = new AuthRoute();

  //     const app = new App([authRoute]);
  //     return request(app.getServer())
  //       .post(`${authRoute.path}/logout`)
  //       .expect('Set-Cookie', /^Authorization=\;/);
  //   });
  // });
});
