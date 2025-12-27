"use strict";

const { User } = require("../../models");

module.exports = {
  async list(req, res, next) {
    try {
      const users = await User.findAll();
      res.render("admin/users/index", {
        title: "用戶管理",
        users,
        layout: "layouts/admin",
      });
    } catch (error) {
      next(error);
    }
  },

  async detail(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        const notFoundError = new Error("User not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      res.render("admin/users/detail", {
        title: `用戶詳情 - ${user.name}`,
        user,
        layout: "layouts/admin",
      });
    } catch (error) {
      next(error);
    }
  },
};

