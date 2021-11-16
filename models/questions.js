'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questions.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Questions.init(
    {
      tags: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      upVote: DataTypes.INTEGER,
      question: DataTypes.STRING,
      DownVote: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Questions',
    },
  );
  return Questions;
};
