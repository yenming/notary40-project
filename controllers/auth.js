"use strict";

const AuthService = require("../services/authService");
const tokenService = require("../services/tokenService");
const { AUTH_COOKIE_NAME } = require("../config/constants");

module.exports = {
  renderLogin(req, res) {
    const { registered, error } = req.query;
    let message = null;

    if (registered) {
      message = "Account created successfully. Please sign in.";
    } else if (error === "unauthorized") {
      message = "Please sign in to continue.";
    }

    res.render("auth/login", {
      title: "Sign In",
      message,
      formData: {},
    });
  },

  renderRegister(req, res) {
    const { error } = req.query;
    res.render("auth/register", {
      title: "Create Account",
      message: error ? "There was a problem creating your account. Please try again." : null,
      formData: {},
    });
  },

  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      await AuthService.registerUser({ name, email, password });
      res.redirect("/auth/login?registered=true");
    } catch (error) {
      if (error.status && error.status < 500) {
        return res.status(error.status).render("auth/register", {
          title: "Create Account",
          message: error.message,
          formData: req.body,
        });
      }
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.authenticateUser(email, password);
      const token = tokenService.generateAccessToken(user);

      const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: tokenService.getTokenExpiryMs(),
      };

      res.cookie(AUTH_COOKIE_NAME, token, cookieOptions);
      res.redirect("/auth/profile");
    } catch (error) {
      if (error.status && error.status < 500) {
        return res.status(error.status).render("auth/login", {
          title: "Sign In",
          message: error.message,
          formData: { email: req.body.email },
        });
      }
      next(error);
    }
  },

  async profile(req, res, next) {
    try {
      res.render("auth/profile", {
        title: "Your Profile",
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  },

  logout(req, res) {
    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    };

    res.clearCookie(AUTH_COOKIE_NAME, cookieOptions);
    res.redirect("/");
  },
};

