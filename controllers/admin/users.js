"use strict";

const { User } = require("../../models");
const { Op } = require("sequelize");
const AuthService = require("../../services/authService");
const bcrypt = require("bcryptjs");

module.exports = {
  async list(req, res, next) {
    try {
      const users = await User.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.render("admin/users/index", {
        title: "用戶管理",
        currentPage: "users",
        users,
        successMessage: req.query.success || null,
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
        currentPage: "users",
        user,
        layout: "layouts/admin",
      });
    } catch (error) {
      next(error);
    }
  },

  renderCreate(req, res) {
    res.render("admin/users/form", {
      title: "新增用戶",
      currentPage: "users",
      user: null,
      formData: null,
      error: null,
      layout: "layouts/admin",
    });
  },

  async create(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.render("admin/users/form", {
          title: "新增用戶",
          currentPage: "users",
          user: null,
          error: "請填寫所有必填欄位",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      if (password.length < 8) {
        return res.render("admin/users/form", {
          title: "新增用戶",
          currentPage: "users",
          user: null,
          error: "密碼長度至少需要 8 個字元",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      await AuthService.registerUser({ name, email, password });
      res.redirect("/admin/users?success=用戶已成功創建");
    } catch (error) {
      if (error.status === 409) {
        return res.render("admin/users/form", {
          title: "新增用戶",
          currentPage: "users",
          user: null,
          error: "此電子郵件已被使用",
          formData: req.body,
          layout: "layouts/admin",
        });
      }
      next(error);
    }
  },

  async renderEdit(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        const notFoundError = new Error("User not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      res.render("admin/users/form", {
        title: `編輯用戶 - ${user.name}`,
        currentPage: "users",
        user,
        layout: "layouts/admin",
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await User.findByPk(req.params.id);

      if (!user) {
        const notFoundError = new Error("User not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      if (!name || !email) {
        return res.render("admin/users/form", {
          title: `編輯用戶 - ${user.name}`,
          currentPage: "users",
          user,
          error: "請填寫所有必填欄位",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // Check if email is already taken by another user
      const existingUser = await User.findOne({
        where: { email, id: { [Op.ne]: user.id } },
      });

      if (existingUser) {
        return res.render("admin/users/form", {
          title: `編輯用戶 - ${user.name}`,
          currentPage: "users",
          user,
          error: "此電子郵件已被其他用戶使用",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // Update user
      user.name = name;
      user.email = email;
      if (password && password.trim().length > 0) {
        if (password.length < 8) {
          return res.render("admin/users/form", {
            title: `編輯用戶 - ${user.name}`,
            currentPage: "users",
            user,
            error: "密碼長度至少需要 8 個字元",
            formData: req.body,
            layout: "layouts/admin",
          });
        }
        user.password = password; // Will be hashed by model hook
      }
      // If password is empty, don't update it

      await user.save();
      res.redirect("/admin/users?success=用戶已成功更新");
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        const notFoundError = new Error("User not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      await user.destroy();
      res.redirect("/admin/users?success=用戶已成功刪除");
    } catch (error) {
      next(error);
    }
  },
};

