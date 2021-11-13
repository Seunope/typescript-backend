import { NextFunction, Request, Response } from 'express';
import { CreateNotificationDto, UpdateNotificationDto } from '@dtos/notifications.dto';
import { Notification } from '@interfaces/notifications.interface';
import notificationService from '@services/notifications.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class NotificationsController {
  public notificationService = new notificationService();

  public getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllNotificationsData: Notification[] = await this.notificationService.findAllNotification();

      res.status(200).json({ data: findAllNotificationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getNotificationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const NotificationId = Number(req.params.id);
      const findOneNotificationData: Notification = await this.notificationService.findNotificationById(NotificationId);

      res.status(200).json({ data: findOneNotificationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createNotification = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      req.body.userId = req.user.id;
      const NotificationData: CreateNotificationDto = req.body;
      const createNotificationData: Notification = await this.notificationService.createNotification(NotificationData);

      res.status(201).json({ data: createNotificationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const NotificationId = Number(req.params.id);
      const NotificationData: UpdateNotificationDto = req.body;
      const updateNotificationData: Notification = await this.notificationService.updateNotification(NotificationId, NotificationData);

      res.status(200).json({ data: updateNotificationData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const NotificationId = Number(req.params.id);
      const deleteNotificationData: Notification = await this.notificationService.deleteNotification(NotificationId);

      res.status(200).json({ data: deleteNotificationData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default NotificationsController;
