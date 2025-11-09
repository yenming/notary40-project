"use strict";

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ["password"],
          },
        },
      },
    }
  );

  User.addHook("beforeCreate", hashPassword);
  User.addHook("beforeUpdate", hashPasswordIfChanged);

  User.prototype.toJSON = function toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return User;
};

async function hashPassword(user) {
  if (!user.password) {
    return;
  }

  const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
  user.password = await bcrypt.hash(user.password, rounds);
}

async function hashPasswordIfChanged(user) {
  if (user.changed("password")) {
    await hashPassword(user);
  }
}

