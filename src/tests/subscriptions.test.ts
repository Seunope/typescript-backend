import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import { CreateDataSubscriptionDto } from '@dtos/subscriptions.dto';
import SubscriptionRoute from '@routes/subscriptions.route';
import { config } from 'dotenv';

config();

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Subscriptions', () => {
  describe('[GET] /subscriptions', () => {
    it('response findAll subscriptions', async () => {
      const subscriptionsRoute = new SubscriptionRoute();
      const subscriptions = subscriptionsRoute.subscriptionsController.subscriptionService.subscriptions;

      subscriptions.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          userId: 1,
          questionId: 2,
          isSubscribed: true,
        },
        {
          id: 3,
          userId: 1,
          questionId: 3,
          isSubscribed: true,
        },
        {
          id: 3,
          userId: 1,
          questionId: 4,
          isSubscribed: true,
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([subscriptionsRoute]);
      return request(app.getServer()).get(`${subscriptionsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /subscriptions/:id', () => {
    it('response findOne subscription', async () => {
      const subscriptionId = 1;

      const subscriptionsRoute = new SubscriptionRoute();
      const subscriptions = subscriptionsRoute.subscriptionsController.subscriptionService.subscriptions;

      subscriptions.findByPk = jest.fn().mockReturnValue({
        id: 1,
        userId: 1,
        questionId: 4,
        isSubscribed: true,
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([subscriptionsRoute]);
      return request(app.getServer()).get(`${subscriptionsRoute.path}/${subscriptionId}`).expect(200);
    });
  });

  describe('[POST] /subscriptions', () => {
    it('response Create subscription', async () => {
      const subscriptionData: CreateDataSubscriptionDto = {
        subscription: 'Test subscription',
      };

      const subscriptionsRoute = new SubscriptionRoute();
      const subscriptions = subscriptionsRoute.subscriptionsController.subscriptionService.subscriptions;

      subscriptions.findOne = jest.fn().mockReturnValue(null);
      subscriptions.create = jest.fn().mockReturnValue({
        id: 1,
        userId: 1,
        questionId: 4,
        isSubscribed: true,
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([subscriptionsRoute]);
      return request(app.getServer())
        .post(`${subscriptionsRoute.path}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(subscriptionData)
        .expect(201);
    });
  });

  describe('[PUT] /subscriptions/:id', () => {
    it('response Update subscription', async () => {
      const subscriptionId = 1;
      const subscriptionData: CreateDataSubscriptionDto = {
        subscription: 'Test subscription',
      };

      const subscriptionsRoute = new SubscriptionRoute();
      const subscriptions = subscriptionsRoute.subscriptionsController.subscriptionService.subscriptions;

      subscriptions.findByPk = jest.fn().mockReturnValue({
        id: subscriptionId,
        subscription: 'subscription Data email',
      });
      subscriptions.update = jest.fn().mockReturnValue([1]);
      subscriptions.findByPk = jest.fn().mockReturnValue({
        id: subscriptionId,
        subscription: 'subscription Data email',
      });

      console.log('enk', process.env.TEST_TOKEN);
      (Sequelize as any).authenticate = jest.fn();
      const app = new App([subscriptionsRoute]);
      return request(app.getServer())
        .put(`${subscriptionsRoute.path}/${subscriptionId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(subscriptionData)
        .expect(200);
    });
  });

  describe('[DELETE] /subscriptions/:id', () => {
    it('response Delete subscription', async () => {
      const subscriptionId = 1;

      const subscriptionsRoute = new SubscriptionRoute();
      const subscriptions = subscriptionsRoute.subscriptionsController.subscriptionService.subscriptions;

      subscriptions.findByPk = jest.fn().mockReturnValue({
        id: subscriptionId,
        subscription: 'subscription Data email',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([subscriptionsRoute]);
      return request(app.getServer())
        .delete(`${subscriptionsRoute.path}/${subscriptionId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .expect(200);
    });
  });
});
