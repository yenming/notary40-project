"use strict";

const jwt = require("jsonwebtoken");

const DEFAULT_EXPIRY = process.env.JWT_EXPIRES_IN || "1d";
const SECRET = process.env.JWT_SECRET || "changeme";

const expiryMs = parseExpiryToMs(DEFAULT_EXPIRY);

function generateAccessToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, SECRET, { expiresIn: DEFAULT_EXPIRY });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

function getTokenExpiryMs() {
  return expiryMs;
}

function parseExpiryToMs(expiry) {
  if (!expiry) {
    return 24 * 60 * 60 * 1000;
  }

  if (/^\d+$/.test(expiry)) {
    return Number(expiry) * 1000;
  }

  const match = expiry.match(/^(\d+)([smhd])$/i);
  if (!match) {
    return 24 * 60 * 60 * 1000;
  }

  const value = Number(match[1]);
  const unit = match[2].toLowerCase();

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * (multipliers[unit] || 24 * 60 * 60 * 1000);
}

module.exports = {
  generateAccessToken,
  verifyToken,
  getTokenExpiryMs,
};

