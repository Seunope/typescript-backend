'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ratings.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Ratings.init(
    {
      type: DataTypes.ENUM,
      modelId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      upVote: DataTypes.BOOLEAN,
      downVote: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Ratings',
    },
  );
  return Ratings;
};
