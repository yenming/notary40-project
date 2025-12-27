"use strict";

module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define(
    "Announcement",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "公告標題",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "公告內容",
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "圖片網址",
      },
      linkUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "連結網址",
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "顯示順序",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "是否啟用",
      },
    },
    {
      tableName: "announcements",
      timestamps: true,
    }
  );

  return Announcement;
};

