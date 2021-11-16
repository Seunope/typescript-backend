'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answers.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
      Answers.belongsTo(models.Questions, {
        foreignKey: 'questionId',
      });
    }
  }
  Answers.init(
    {
      reply: DataTypes.STRING,
      questionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      upVote: DataTypes.INTEGER,
      downVote: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Answers',
    },
  );
  return Answers;
};
