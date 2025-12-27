"use strict";

module.exports = {
  indexPage(req, res) {
    res.render("doc/index", {
      title: "相關文件",
      description: "下載各類公證服務相關文件範本與表格，包含房屋租賃契約、授權書、委託書等文件格式。",
      keywords: "公證文件下載,公證表格,文件範本,公證服務文件"
    });
  }
};

