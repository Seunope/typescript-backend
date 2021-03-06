import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password' | 'username'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public email: string;
  public password: string;
  public username: string;
  public lastName: string;
  public firstName: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  // UserModel.associate = function (models) {
  //   // associations can be defined here
  // };
  return UserModel;
}
