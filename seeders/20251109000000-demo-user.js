"use strict";

require("dotenv").config();
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    const password = await bcrypt.hash("password123", saltRounds);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Demo User",
          email: "demo@com.tw",
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      "users",
      { email: "demo@com.tw" },
      {}
    );
  },
};

