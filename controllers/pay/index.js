"use strict";

module.exports = {
  indexPage(req, res) {
    res.render("pay/index", {
      title: "收費標準",
      description: "士林區民間公證人張加慶事務所公證服務收費標準，收費透明公開，與法院公證處收費相同。",
      keywords: "公證費用,公證收費標準,公證服務價格,公證人收費"
    });
  }
};

