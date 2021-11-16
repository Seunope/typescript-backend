import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Comment } from '@interfaces/comments.interface';

export type CommentCreationAttributes = Optional<Comment, 'id' | 'answerId' | 'message' | 'userId'>;

export class CommentModel extends Model<Comment, CommentCreationAttributes> implements Comment {
  id: number;
  userId: number;
  message: string;
  answerId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CommentModel {
  CommentModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      answerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'Comments',
      sequelize,
    },
  );

  return CommentModel;
}
