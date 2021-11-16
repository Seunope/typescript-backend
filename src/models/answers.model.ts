import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Reply } from '@interfaces/answers.interface';

export type ReplyCreationAttributes = Optional<Reply, 'id' | 'reply' | 'questionId' | 'userId' | 'upVote' | 'downVote'>;

export class ReplyModel extends Model<Reply, ReplyCreationAttributes> implements Reply {
  id: number;
  reply: string;
  userId: number;
  upVote: number;
  downVote: number;
  questionId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ReplyModel {
  ReplyModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      reply: {
        allowNull: false,
        type: DataTypes.STRING(225),
      },
      questionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      upVote: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      downVote: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'Answers',
      sequelize,
    },
  );

  return ReplyModel;
}
