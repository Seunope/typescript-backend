import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import UserRoute from '@routes/users.route';
import { config } from 'dotenv';

config();

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll users', async () => {
      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;

      users.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          id: 2,
          email: 'b@email.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          id: 3,
          email: 'c@email.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne user', async () => {
      const userId = 1;

      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;

      users.findByPk = jest.fn().mockReturnValue({
        id: 1,
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create user', async () => {
      const userData: CreateUserDto = {
        email: 'ab@g.com',
        password: '123456',
        username: 'test007',
        firstName: 'test',
        lastName: 'test2',
      };

      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        id: 1,
        email: userData.email,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: await bcrypt.hash(userData.password, 10),
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).post(`${usersRoute.path}`).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update user', async () => {
      const userId = 1;
      const userData: UpdateUserDto = {
        username: 'test007',
        firstName: 'test',
        lastName: 'test2',
      };

      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;

      users.findByPk = jest.fn().mockReturnValue({
        id: userId,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      users.update = jest.fn().mockReturnValue([1]);
      users.findByPk = jest.fn().mockReturnValue({
        id: userId,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer())
        .put(`${usersRoute.path}/${userId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(userData)
        .expect(200);
    });
  });

  // describe('[DELETE] /users/:id', () => {
  //   it('response Delete user', async () => {
  //     const userId = 1;

  //     const usersRoute = new UserRoute();
  //     const users = usersRoute.usersController.userService.users;

  //     users.findByPk = jest.fn().mockReturnValue({
  //       id: userId,
  //       email: 'a@email.com',
  //       password: await bcrypt.hash('q1w2e3r4!', 10),
  //     });

  //     (Sequelize as any).authenticate = jest.fn();
  //     const app = new App([usersRoute]);
  //     return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`).expect(200);
  //   });
  // });
});
