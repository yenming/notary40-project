"use strict";

const AuthService = require("../services/authService");
const tokenService = require("../services/tokenService");
const { AUTH_COOKIE_NAME } = require("../config/constants");

function extractToken(req) {
  if (req.cookies && req.cookies[AUTH_COOKIE_NAME]) {
    return req.cookies[AUTH_COOKIE_NAME];
  }

  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
}

async function authenticate(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return handleUnauthorized(req, res);
    }

    const payload = tokenService.verifyToken(token);
    const user = await AuthService.findUserById(payload.sub);

    if (!user) {
      return handleUnauthorized(req, res);
    }

    req.user = user;
    res.locals.user = user;
    return next();
  } catch (error) {
    return handleUnauthorized(req, res);
  }
}

async function currentUser(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      res.locals.user = null;
      // Set current URL for SEO
      res.locals.currentUrl = process.env.BASE_URL || `https://yourdomain.com${req.originalUrl || '/'}`;
      return next();
    }

    const payload = tokenService.verifyToken(token);
    const user = await AuthService.findUserById(payload.sub);

    req.user = user;
    res.locals.user = user;
    // Set current URL for SEO
    res.locals.currentUrl = process.env.BASE_URL || `https://yourdomain.com${req.originalUrl || '/'}`;
    return next();
  } catch (error) {
    res.locals.user = null;
    // Set current URL for SEO
    res.locals.currentUrl = process.env.BASE_URL || `https://yourdomain.com${req.originalUrl || '/'}`;
    return next();
  }
}

function handleUnauthorized(req, res) {
  if (req.accepts("html")) {
    return res.redirect("/login?error=unauthorized");
  }

  return res.status(401).json({ error: "Unauthorized" });
}

module.exports = {
  authenticate,
  currentUser,
};

