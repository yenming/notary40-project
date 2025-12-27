"use strict";

const { Post } = require("../../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

// 生成 slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

module.exports = {
  async list(req, res, next) {
    try {
      const posts = await Post.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.render("admin/posts/index", {
        title: "最新消息管理",
        currentPage: "posts",
        posts,
        successMessage: req.query.success || null,
        layout: "layouts/admin",
      });
    } catch (error) {
      next(error);
    }
  },

  async detail(req, res, next) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        const notFoundError = new Error("Post not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      res.render("admin/posts/detail", {
        title: `文章詳情 - ${post.title}`,
        currentPage: "posts",
        post,
        layout: "layouts/admin",
      });
    } catch (error) {
      next(error);
    }
  },

  renderCreate(req, res) {
    res.render("admin/posts/form", {
      title: "新增文章",
      currentPage: "posts",
      post: null,
      formData: null,
      error: null,
      layout: "layouts/admin",
    });
  },

  async create(req, res, next) {
    try {
      const {
        title,
        excerpt,
        content,
        category,
        tags,
        isPublished,
        publishedAt,
      } = req.body;

      if (!title || !content) {
        return res.render("admin/posts/form", {
          title: "新增文章",
          currentPage: "posts",
          post: null,
          error: "請填寫標題和內容",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // 处理文件上传错误
      if (req.fileValidationError) {
        return res.render("admin/posts/form", {
          title: "新增文章",
          currentPage: "posts",
          post: null,
          error: req.fileValidationError,
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // 处理文件上传
      let featuredImage = null;
      if (req.file) {
        featuredImage = `uploads/posts/${req.file.filename}`;
      }

      // 生成 slug
      let slug = generateSlug(title);
      // 确保 slug 唯一
      let slugExists = await Post.findOne({ where: { slug } });
      let counter = 1;
      while (slugExists) {
        slug = `${generateSlug(title)}-${counter}`;
        slugExists = await Post.findOne({ where: { slug } });
        counter++;
      }

      await Post.create({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        featuredImage,
        category: category || null,
        tags: tags || null,
        isPublished: isPublished === "true" || isPublished === "on",
        publishedAt:
          isPublished === "true" || isPublished === "on"
            ? publishedAt || new Date()
            : null,
      });

      res.redirect("/admin/posts?success=文章已成功創建");
    } catch (error) {
      // 如果创建失败，删除已上传的文件
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
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        const notFoundError = new Error("Post not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      res.render("admin/posts/form", {
        title: `編輯文章 - ${post.title}`,
        currentPage: "posts",
        post,
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
      const {
        title,
        excerpt,
        content,
        category,
        tags,
        isPublished,
        publishedAt,
      } = req.body;
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        const notFoundError = new Error("Post not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      if (!title || !content) {
        return res.render("admin/posts/form", {
          title: `編輯文章 - ${post.title}`,
          currentPage: "posts",
          post,
          error: "請填寫標題和內容",
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // 处理文件上传错误
      if (req.fileValidationError) {
        return res.render("admin/posts/form", {
          title: `編輯文章 - ${post.title}`,
          currentPage: "posts",
          post,
          error: req.fileValidationError,
          formData: req.body,
          layout: "layouts/admin",
        });
      }

      // 处理文件上传：如果有新文件上传，删除旧文件
      if (req.file) {
        // 删除旧图片（如果存在且是上传的文件）
        if (
          post.featuredImage &&
          post.featuredImage.startsWith("uploads/posts/")
        ) {
          const oldImagePath = path.join(
            __dirname,
            "../../public",
            post.featuredImage
          );
          try {
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          } catch (err) {
            console.error("删除旧图片失败:", err);
          }
        }
        post.featuredImage = `uploads/posts/${req.file.filename}`;
      }
      // 如果没有上传新文件，保持原有图片

      // 如果标题改变，更新 slug
      if (title !== post.title) {
        let slug = generateSlug(title);
        // 确保 slug 唯一（排除当前文章）
        let slugExists = await Post.findOne({
          where: { slug, id: { [Op.ne]: post.id } },
        });
        let counter = 1;
        while (slugExists) {
          slug = `${generateSlug(title)}-${counter}`;
          slugExists = await Post.findOne({
            where: { slug, id: { [Op.ne]: post.id } },
          });
          counter++;
        }
        post.slug = slug;
      }

      post.title = title;
      post.excerpt = excerpt || null;
      post.content = content;
      post.category = category || null;
      post.tags = tags || null;
      post.isPublished = isPublished === "true" || isPublished === "on";
      post.publishedAt =
        isPublished === "true" || isPublished === "on"
          ? publishedAt || post.publishedAt || new Date()
          : null;

      await post.save();
      res.redirect("/admin/posts?success=文章已成功更新");
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
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        const notFoundError = new Error("Post not found.");
        notFoundError.status = 404;
        throw notFoundError;
      }

      // 删除关联的图片文件
      if (
        post.featuredImage &&
        post.featuredImage.startsWith("uploads/posts/")
      ) {
        const imagePath = path.join(
          __dirname,
          "../../public",
          post.featuredImage
        );
        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        } catch (err) {
          console.error("删除图片文件失败:", err);
        }
      }

      await post.destroy();
      res.redirect("/admin/posts?success=文章已成功刪除");
    } catch (error) {
      next(error);
    }
  },
};

