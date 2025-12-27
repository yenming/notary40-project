"use strict";

require("dotenv").config();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "announcements",
      [
        {
          title: "歡迎來到民間公證人張加慶事務所",
          content: "提供專業公證服務，歡迎預約諮詢",
          imageUrl: "assets/img/index/index3.jpg",
          linkUrl: null,
          order: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "服務項目",
          content: "房屋租賃契約公證、房屋借用契約公證、授權書委託書認證等",
          imageUrl: "assets/img/index/index.png",
          linkUrl: null,
          order: 2,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "聯絡資訊",
          content: "歡迎來電或線上預約",
          imageUrl: "assets/img/index/index2.png",
          linkUrl: null,
          order: 3,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("announcements", null, {});
  },
};

