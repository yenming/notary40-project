"use strict";

module.exports = {
  indexPage(req, res) {
    res.render("contact/index", {
      title: "聯絡我們",
      description: "聯絡士林區民間公證人張加慶事務所，預約公證服務時間，詢問公證相關問題。提供專業、快速、便利的公證服務。",
      keywords: "公證人聯絡,預約公證服務,士林區公證人,公證服務諮詢"
    });
  }
};

