"use strict";

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "文章標題",
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        comment: "URL 友好標識",
      },
      excerpt: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "文章摘要",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "文章內容",
      },
      featuredImage: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "特色圖片",
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "分類",
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "標籤（逗號分隔）",
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "發布時間",
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "是否發布",
      },
      viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "瀏覽次數",
      },
    },
    {
      tableName: "posts",
      timestamps: true,
    }
  );

  return Post;
};

