"use strict";

require("dotenv").config();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("announcements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "公告標題",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "公告內容",
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "圖片網址",
      },
      linkUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "連結網址",
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "顯示順序",
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: "是否啟用",
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
    await queryInterface.dropTable("announcements");
  },
};

