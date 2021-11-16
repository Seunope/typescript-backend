import DB from '@databases';
import { isEmpty } from '@utils/util';
import models from '@utils/models';
import { Reply } from '@/interfaces/answers.interface';
import { HttpException } from '@exceptions/HttpException';
import { Notification } from '@interfaces/notifications.interface';
import { Subscription } from '@/interfaces/subscriptions.interface';
import { CreateNotificationDto, UpdateNotificationDto } from '@dtos/notifications.dto';
import constants from '@/utils/constants';

class NotificationService {
  public reply = models.Answers;
  public notifications = models.Notifications;
  public subscriptions = models.Subscriptions;
  private relationship = { include: { model: models.Subscriptions } };

  public async findAllNotification(): Promise<Notification[]> {
    const allNotification: Notification[] = await this.notifications.findAll({ ...this.relationship });
    return allNotification;
  }

  public async findNotificationById(NotificationId: number): Promise<Notification> {
    if (isEmpty(NotificationId)) throw new HttpException(400, constants.EMPTY_ID);

    const findNotification: Notification = await this.notifications.findByPk(NotificationId);
    if (!findNotification) throw new HttpException(409, constants.NOT_FOUND);

    return findNotification;
  }

  public async findUserNotificationsById(UserId: number): Promise<Notification[]> {
    const userNotifications: Notification[] = await this.notifications.findAll({ where: { userId: UserId } });

    return userNotifications;
  }

  public async createNotification(NotificationData: CreateNotificationDto): Promise<Notification> {
    if (isEmpty(NotificationData)) throw new HttpException(400, constants.EMPTY_BODY);

    const findReply: Reply = await this.reply.findOne({ where: { id: NotificationData.replyId } });
    if (!findReply) throw new HttpException(409, `Reply ID: " ${NotificationData.replyId}" is not found`);

    const findSubscription: Subscription = await this.subscriptions.findOne({
      where: { id: NotificationData.subscriptionId },
    });
    if (!findSubscription) throw new HttpException(409, `Subscription ID: " ${NotificationData.subscriptionId}" is not found`);

    const findNotification: Notification = await this.notifications.findOne({
      where: { subscriptionId: NotificationData.subscriptionId, replyId: NotificationData.replyId },
    });
    if (findNotification) throw new HttpException(402, 'Notification message already sent');

    const createNotificationData: Notification = await this.notifications.create({ ...NotificationData });
    return createNotificationData;
  }

  public async updateNotification(NotificationId: number, NotificationData: UpdateNotificationDto): Promise<Notification> {
    if (isEmpty(NotificationData)) throw new HttpException(400, constants.EMPTY_ID);

    const findNotification: Notification = await this.notifications.findByPk(NotificationId);
    if (!findNotification) throw new HttpException(409, constants.NOT_FOUND);

    await this.notifications.update({ ...NotificationData }, { where: { id: NotificationId } });

    const updateNotification: Notification = await this.notifications.findByPk(NotificationId);
    return updateNotification;
  }

  public async deleteNotification(NotificationId: number): Promise<Notification> {
    if (isEmpty(NotificationId)) throw new HttpException(400, constants.EMPTY_ID);

    const findNotification: Notification = await this.notifications.findByPk(NotificationId);
    if (!findNotification) throw new HttpException(409, constants.NOT_FOUND);

    await this.notifications.destroy({ where: { id: NotificationId } });

    return findNotification;
  }
}

export default NotificationService;
