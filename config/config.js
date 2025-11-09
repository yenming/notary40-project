"use strict";

require("dotenv").config();

const shared = {
  username: process.env.DB_USER || "store_radar_app",
  password: process.env.DB_PASSWORD || "store_radar_pass",
  database: process.env.DB_NAME || "store_radar",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3307),
  dialect: "mysql",
  logging: false,
};

module.exports = {
  development: { ...shared },
  test: {
    ...shared,
    database: `${shared.database}_test`,
  },
  production: {
    ...shared,
    logging: false,
  },
};

