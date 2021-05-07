"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.status.belongsToMany(models.todo, {
        through: "joinTable",
        foreignKey: "statusId",
      });
    }
  }
  status.init(
    {
      important: DataTypes.BOOLEAN,
      complete: DataTypes.BOOLEAN,
      deleteId: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "status",
    }
  );
  return status;
};
