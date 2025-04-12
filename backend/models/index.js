const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.Store = require('./store.model')(sequelize, DataTypes);
db.Rating = require('./rating.model')(sequelize, DataTypes);

// Relationships
db.User.hasMany(db.Rating);
db.Rating.belongsTo(db.User);

db.Store.hasMany(db.Rating);
db.Rating.belongsTo(db.Store);

module.exports = db;
