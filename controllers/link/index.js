"use strict";

module.exports = {
  indexPage(req, res) {
    res.render("link/index", {
      title: "相關連結",
      description: "相關政府機關與公證業務相關網站連結，包含司法院、地方法院、戶政事務所、地政事務所等。",
      keywords: "公證相關連結,司法院,地方法院,戶政事務所,地政事務所"
    });
  }
};

