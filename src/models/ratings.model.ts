import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Rating } from '@interfaces/ratings.interface';

export type RatingCreationAttributes = Optional<Rating, 'id' | 'type' | 'modelId' | 'upVote' | 'downVote' | 'userId'>;

export class RatingModel extends Model<Rating, RatingCreationAttributes> implements Rating {
  id: number;
  type: string;
  userId: number;
  modelId: number;
  upVote: boolean;
  downVote: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof RatingModel {
  RatingModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM({
          values: ['question', 'reply'],
        }),
      },
      upVote: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      modelId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      downVote: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'Ratings',
      sequelize,
    },
  );

  return RatingModel;
}
