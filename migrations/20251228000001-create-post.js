"use strict";

require("dotenv").config();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "文章標題",
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        comment: "URL 友好標識",
      },
      excerpt: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "文章摘要",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "文章內容",
      },
      featuredImage: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "特色圖片",
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "分類",
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "標籤（逗號分隔）",
      },
      publishedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "發布時間",
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: "是否發布",
      },
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "瀏覽次數",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("posts");
  },
};

