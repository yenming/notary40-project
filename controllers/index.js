"use strict";

const { Announcement } = require("../models");

module.exports = {
  async index(req, res, next) {
    try {
      // 獲取啟用的公告，按順序排列
      const announcements = await Announcement.findAll({
        where: {
          isActive: true,
        },
        order: [["order", "ASC"], ["createdAt", "DESC"]],
      });

      res.render("home", {
        title: "首頁",
        description: "臺灣士林地方法院所屬民間公證人張加慶事務所，提供房屋借用契約公證、房屋租賃契約公證、授權書委託書認證、終止房屋租賃契約公證、單身證明認證、自書遺囑認證、信託契約公證、職務宿舍借用契約公證、贈與契約公證、離婚協議書公證等專業公證服務。",
        keywords: "民間公證人,張加慶,士林區公證人,臺灣士林地方法院,房屋租賃契約公證,房屋借用契約公證,授權書認證,委託書認證,遺囑認證,單身證明認證,離婚協議書公證,贈與契約公證",
        user: res.locals.user || null,
        announcements: announcements || [],
      });
    } catch (error) {
      next(error);
    }
  },
};

