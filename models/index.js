"use strict";

const { Sequelize } = require("sequelize");
const databaseConfig = require("../config/database");

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize.DataTypes);
db.Announcement = require("./announcement")(sequelize, Sequelize.DataTypes);

Object.values(db)
  .filter((model) => typeof model?.associate === "function")
  .forEach((model) => {
    model.associate(db);
  });

module.exports = db;

