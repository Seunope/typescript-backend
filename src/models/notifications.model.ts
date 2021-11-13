import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Notification } from '@interfaces/notifications.interface';

export type NotificationCreationAttributes = Optional<Notification, 'id' | 'subscriptionId' | 'replyId' | 'isViewed'>;

export class NotificationModel extends Model<Notification, NotificationCreationAttributes> implements Notification {
  id: number;
  replyId: number;
  isViewed: boolean;
  subscriptionId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof NotificationModel {
  NotificationModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      subscriptionId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      replyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isViewed: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'Notifications',
      sequelize,
    },
  );

  return NotificationModel;
}
