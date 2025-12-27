"use strict";

module.exports = {
  indexPage(req, res) {
    res.render("about/index", {
      title: "關於公證人",
      description: "認識臺灣士林地方法院所屬民間公證人張加慶，了解公證人的職責與服務範圍，提供專業、快速、便利的公證服務。",
      keywords: "民間公證人,張加慶,士林區公證人,臺灣士林地方法院,公證人介紹,公證服務"
    });
  }
};

