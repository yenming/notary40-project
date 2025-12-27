"use strict";

require("dotenv").config();

const config = {
  username: process.env.DB_USER || "notary40_app",
  password: process.env.DB_PASSWORD || "notary40_pass",
  database: process.env.DB_NAME || "notary40",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3307),
  dialect: "mysql",
  logging: false,
  define: {
    underscored: false,
    freezeTableName: false,
  },
};

module.exports = config;

