import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import NotificationsController from '@controllers/notifications.controller';
import { CreateNotificationDto, UpdateNotificationDto } from '@dtos/notifications.dto';

class NotificationsRoute implements Routes {
  public path = '/notifications';
  public router = Router();
  public notificationsController = new NotificationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.notificationsController.getNotifications);
    this.router.get(`${this.path}/:id(\\d+)`, this.notificationsController.getNotificationById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateNotificationDto, 'body'),
      this.notificationsController.createNotification,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(UpdateNotificationDto, 'body', true),
      this.notificationsController.updateNotification,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.notificationsController.deleteNotification);
  }
}

export default NotificationsRoute;
