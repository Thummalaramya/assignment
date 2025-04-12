module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Store", {
      name: { type: DataTypes.STRING(60), allowNull: false },
      address: { type: DataTypes.STRING(400), allowNull: false },
    });
  };
  