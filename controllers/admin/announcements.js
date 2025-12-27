"use strict";

const { Announcement } = require("../../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

module.exports = {
  async list(req, res, next) {
    try {
      const announcements = await Announcement.findAll({
        order: [["order", "ASC"], ["createdAt", "DESC"]],
      });
      res.render("admin/announcements/index", {
        title: "公告欄管理",
        currentPage: "announcements",
        announcements,
        successMessage: req.query.success || null,
        layout: "layouts/admin",
      });
    } catch (error) {
      next(error);
    }
  },

  async detail(req, res, next) {
    try {
      const announcement = await Announcement.findByPk(req.params.id);
      if (!announcement) {
        const notFoundError = new Error("Announcement not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      res.render("admin/announcements/detail", {
        title: `公告詳情 - ${announcement.title}`,
        currentPage: "announcements",
        announcement,
        layout: "layouts/admin",
      });
    } catch (error) {
      next(error);
    }
  },

  renderCreate(req, res) {
    res.render("admin/announcements/form", {
      title: "新增公告",
      currentPage: "announcements",
      announcement: null,
      formData: null,
      error: null,
      layout: "layouts/admin",
    });
  },

  async create(req, res, next) {
    try {
      const { title, content, linkUrl, order, isActive, displayType } = req.body;

      if (!title) {
        return res.render("admin/announcements/form", {
          title: "新增公告",
          currentPage: "announcements",
          announcement: null,
          error: "請填寫公告標題",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // 验证显示模式
      if (displayType === "image" && !req.file) {
        return res.render("admin/announcements/form", {
          title: "新增公告",
          currentPage: "announcements",
          announcement: null,
          error: "圖片模式必須上傳圖片",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      if (displayType === "text" && !content) {
        return res.render("admin/announcements/form", {
          title: "新增公告",
          currentPage: "announcements",
          announcement: null,
          error: "文字模式必須填寫公告內容",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // 文字模式下，如果上传了图片，也允许保存（图片作为可选）
      // 但主要显示内容是文字

      // 处理文件上传错误
      if (req.fileValidationError) {
        return res.render("admin/announcements/form", {
          title: "新增公告",
          currentPage: "announcements",
          announcement: null,
          error: req.fileValidationError,
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // 处理文件上传
      let imageUrl = null;
      if (req.file) {
        imageUrl = `uploads/announcements/${req.file.filename}`;
      }

      await Announcement.create({
        title,
        content: displayType === "text" ? content : (content || null),
        // 文字模式下，图片是可选的（如果上传了就保存，没上传就为null）
        // 图片模式下，必须有图片
        imageUrl: displayType === "image" ? imageUrl : (displayType === "text" ? imageUrl : null),
        linkUrl: linkUrl || null,
        order: order ? parseInt(order) : 0,
        isActive: isActive === "true" || isActive === "on",
      });

      res.redirect("/admin/announcements?success=公告已成功創建");
    } catch (error) {
      // 如果上传失败，删除已上传的文件
      if (req.file && req.file.path) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (err) {
          console.error("删除上传文件失败:", err);
        }
      }
      next(error);
    }
  },

  async renderEdit(req, res, next) {
    try {
      const announcement = await Announcement.findByPk(req.params.id);
      if (!announcement) {
        const notFoundError = new Error("Announcement not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      res.render("admin/announcements/form", {
        title: `編輯公告 - ${announcement.title}`,
        currentPage: "announcements",
        announcement,
        formData: null,
        error: null,
        layout: "layouts/admin",
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { title, content, linkUrl, order, isActive, displayType } = req.body;
      const announcement = await Announcement.findByPk(req.params.id);

      if (!announcement) {
        const notFoundError = new Error("Announcement not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      if (!title) {
        return res.render("admin/announcements/form", {
          title: `編輯公告 - ${announcement.title}`,
          currentPage: "announcements",
          announcement,
          error: "請填寫公告標題",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // 验证显示模式
      // 编辑模式下：如果选择图片模式，但没有上传新图片且原本也没有图片，才需要报错
      if (displayType === "image" && !req.file && !announcement.imageUrl) {
        return res.render("admin/announcements/form", {
          title: `編輯公告 - ${announcement.title}`,
          currentPage: "announcements",
          announcement,
          error: "圖片模式必須有圖片，請上傳圖片或切換到文字模式",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      if (displayType === "text" && !content) {
        return res.render("admin/announcements/form", {
          title: `編輯公告 - ${announcement.title}`,
          currentPage: "announcements",
          announcement,
          error: "文字模式必須填寫公告內容",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // 文字模式下，图片是可选的，如果上传了新图片可以保存

      // 处理文件上传错误
      if (req.fileValidationError) {
        return res.render("admin/announcements/form", {
          title: `編輯公告 - ${announcement.title}`,
          currentPage: "announcements",
          announcement,
          error: req.fileValidationError,
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // 处理文件上传
      if (req.file) {
        // 如果有新文件上传，删除旧文件
        if (
          announcement.imageUrl &&
          announcement.imageUrl.startsWith("uploads/announcements/")
        ) {
          const oldImagePath = path.join(
            __dirname,
            "../../public",
            announcement.imageUrl
          );
          try {
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          } catch (err) {
            console.error("删除旧图片失败:", err);
          }
        }
        // 保存新图片（无论是图片模式还是文字模式）
        announcement.imageUrl = `uploads/announcements/${req.file.filename}`;
      } else {
        // 如果没有上传新图片，保持原有图片（无论是图片模式还是文字模式）
        // 不做任何操作，announcement.imageUrl 保持不变
      }

      announcement.title = title;
      announcement.content = displayType === "text" ? content : (content || null);
      announcement.linkUrl = linkUrl || null;
      announcement.order = order ? parseInt(order) : 0;
      announcement.isActive = isActive === "true" || isActive === "on";

      await announcement.save();
      res.redirect("/admin/announcements?success=公告已成功更新");
    } catch (error) {
      // 如果更新失败，删除已上传的文件
      if (req.file && req.file.path) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (err) {
          console.error("删除上传文件失败:", err);
        }
      }
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const announcement = await Announcement.findByPk(req.params.id);
      if (!announcement) {
        const notFoundError = new Error("Announcement not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      // 删除关联的图片文件
      if (
        announcement.imageUrl &&
        announcement.imageUrl.startsWith("uploads/announcements/")
      ) {
        const imagePath = path.join(
          __dirname,
          "../../public",
          announcement.imageUrl
        );
        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        } catch (err) {
          console.error("删除图片文件失败:", err);
        }
      }

      await announcement.destroy();
      res.redirect("/admin/announcements?success=公告已成功刪除");
    } catch (error) {
      next(error);
    }
  },
};

