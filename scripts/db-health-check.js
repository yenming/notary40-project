"use strict";

const { sequelize } = require("../models");

async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection OK");
    process.exit(0);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

checkConnection();

