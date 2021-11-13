import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Subscription } from '@interfaces/subscriptions.interface';

export type SubscriptionCreationAttributes = Optional<Subscription, 'id' | 'questionId' | 'isSubscribed' | 'userId'>;

export class SubscriptionModel extends Model<Subscription, SubscriptionCreationAttributes> implements Subscription {
  id: number;
  userId: number;
  questionId: number;
  isSubscribed: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof SubscriptionModel {
  SubscriptionModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      questionId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isSubscribed: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'Subscriptions',
      sequelize,
    },
  );

  return SubscriptionModel;
}
