module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
      name: { type: DataTypes.STRING(60), allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING(400), allowNull: false },
      role: { type: DataTypes.ENUM("Admin", "Normal", "StoreOwner"), allowNull: false },
    });
  };
  