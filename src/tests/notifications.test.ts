import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import { config } from 'dotenv';
import NotificationRoute from '@routes/notifications.route';
import { CreateDataNotificationDto, CreateNotificationDto, UpdateNotificationDto } from '@dtos/notifications.dto';

config();

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Notifications', () => {
  describe('[GET] /notifications', () => {
    it('response findAll notifications', async () => {
      const notificationsRoute = new NotificationRoute();
      const notifications = notificationsRoute.notificationsController.notificationService.notifications;

      notifications.findAll = jest.fn().mockReturnValue([
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
      const app = new App([notificationsRoute]);
      return request(app.getServer()).get(`${notificationsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /notifications/:id', () => {
    it('response findOne notification', async () => {
      const notificationId = 1;

      const notificationsRoute = new NotificationRoute();
      const notifications = notificationsRoute.notificationsController.notificationService.notifications;

      notifications.findByPk = jest.fn().mockReturnValue({
        id: 1,
        replyId: 1,
        userId: 1,
        subscriptionId: 4,
        isViewed: false,
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([notificationsRoute]);
      return request(app.getServer()).get(`${notificationsRoute.path}/${notificationId}`).expect(200);
    });
  });

  describe('[POST] /notifications', () => {
    it('response Create notification', async () => {
      const notificationData: CreateDataNotificationDto = {
        replyId: 2,
        subscriptionId: 2,
        isViewed: false,
      };

      const notificationsRoute = new NotificationRoute();
      const notifications = notificationsRoute.notificationsController.notificationService.notifications;

      notifications.findOne = jest.fn().mockReturnValue(null);
      notifications.create = jest.fn().mockReturnValue({
        id: 1,
        replyId: 1,
        subscriptionId: 4,
        isViewed: false,
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([notificationsRoute]);
      return request(app.getServer())
        .post(`${notificationsRoute.path}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(notificationData)
        .expect(201);
    });
  });

  describe('[PUT] /notifications/:id', () => {
    it('response Update notification', async () => {
      const notificationId = 1;
      const notificationData: UpdateNotificationDto = {
        isViewed: true,
      };

      const notificationsRoute = new NotificationRoute();
      const notifications = notificationsRoute.notificationsController.notificationService.notifications;

      notifications.findByPk = jest.fn().mockReturnValue({
        id: notificationId,
        notification: 'notification Data email',
      });
      notifications.update = jest.fn().mockReturnValue([1]);
      notifications.findByPk = jest.fn().mockReturnValue({
        id: notificationId,
        notification: 'notification Data email',
      });

      console.log('enk', process.env.TEST_TOKEN);
      (Sequelize as any).authenticate = jest.fn();
      const app = new App([notificationsRoute]);
      return request(app.getServer())
        .put(`${notificationsRoute.path}/${notificationId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(notificationData)
        .expect(200);
    });
  });

  describe('[DELETE] /notifications/:id', () => {
    it('response Delete notification', async () => {
      const notificationId = 1;

      const notificationsRoute = new NotificationRoute();
      const notifications = notificationsRoute.notificationsController.notificationService.notifications;

      notifications.findByPk = jest.fn().mockReturnValue({
        id: notificationId,
        notification: 'notification Data email',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([notificationsRoute]);
      return request(app.getServer())
        .delete(`${notificationsRoute.path}/${notificationId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .expect(200);
    });
  });
});
