'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscriptions.belongsTo(models.Questions, {
        foreignKey: 'questionId',
      });
      Subscriptions.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Subscriptions.init(
    {
      questionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      isSubscribed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Subscriptions',
    },
  );
  return Subscriptions;
};
