"use strict";

require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3000;
const MAX_RETRIES = parseInt(process.env.DB_CONNECT_RETRIES || "10", 10);
const RETRY_DELAY_MS = parseInt(process.env.DB_CONNECT_RETRY_DELAY || "2000", 10);

async function authenticateWithRetry(attempt = 1) {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    if (attempt > MAX_RETRIES) {
      console.error("Unable to connect to the database after multiple attempts:", error.message);
      process.exit(1);
    }

    console.warn(
      `Database connection failed (attempt ${attempt}/${MAX_RETRIES}): ${error.message}. Retrying in ${RETRY_DELAY_MS}ms...`
    );
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    await authenticateWithRetry(attempt + 1);
  }
}

async function startServer() {
  await authenticateWithRetry();

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();

