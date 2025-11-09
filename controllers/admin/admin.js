"use strict";

const { User } = require("../../models");

module.exports = {
  renderLogin(req, res) {
    res.render("admin/login", {
      title: "Admin Login",
      layout: "layouts/admin",
    });
  },

  async dashboard(req, res, next) {
    try {
      const stats = {
        users: await User.count(),
      };

      res.render("admin/dashboard", {
        title: "Admin Dashboard",
        user: req.user,
        stats,
        layout: "layouts/admin",
      });
    } catch (error) {
      next(error);
    }
  },
};

