"use strict";

const bcrypt = require("bcryptjs");
const { User } = require("../models");

async function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    const error = new Error("Name, email, and password are required.");
    error.status = 400;
    throw error;
  }

  const existingUser = await User.scope("withPassword").findOne({
    where: { email },
  });

  if (existingUser) {
    const error = new Error("Email is already registered.");
    error.status = 409;
    throw error;
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return user.toJSON();
}

async function authenticateUser(email, password) {
  if (!email || !password) {
    const error = new Error("Email and password are required.");
    error.status = 400;
    throw error;
  }

  const user = await User.scope("withPassword").findOne({
    where: { email },
  });

  if (!user) {
    const error = new Error("Invalid credentials.");
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid credentials.");
    error.status = 401;
    throw error;
  }

  return user.toJSON();
}

async function findUserById(id) {
  if (!id) {
    return null;
  }

  const user = await User.findByPk(id);
  return user ? user.toJSON() : null;
}

module.exports = {
  registerUser,
  authenticateUser,
  findUserById,
};

