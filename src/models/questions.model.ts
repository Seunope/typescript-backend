import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Question } from '@interfaces/questions.interface';

export type QuestionCreationAttributes = Optional<Question, 'id' | 'question' | 'upVote' | 'downVote' | 'userId'>;

export class QuestionModel extends Model<Question, QuestionCreationAttributes> implements Question {
  id: number;
  userId: number;
  upVote: number;
  question: string;
  downVote: number;
 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof QuestionModel {
  QuestionModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      question: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      upVote: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      downVote: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'Questions',
      sequelize,
    },
  );

  return QuestionModel;
}
