'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
      Comments.belongsTo(models.Answers, {
        foreignKey: 'answerId',
      });
    }
  }
  Comments.init(
    {
      message: DataTypes.STRING,
      answerId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comments',
    },
  );
  return Comments;
};
