"use strict";

module.exports = {
  indexPage(req, res) {
    res.render("blog/index", {
      title: "最新消息",
      description: "士林區民間公證人張加慶事務所最新消息與公告，包含各類公證服務資訊、法規更新、常見問題等。",
      keywords: "公證人最新消息,公證服務公告,士林區公證人資訊"
    });
  },
  blogDetailsPage(req, res) {
    res.render("blog/blog_details", {
      title: "房屋借用契約公證",
      description: "房屋無償借用契約公證服務，約定逕受強制執行條款，保障雙方權利，避免糾紛。本所公證效力及收費均等同法院。",
      keywords: "房屋借用契約公證,無償借用契約,強制執行條款,公證服務"
    });
  },
  blogDetails2Page(req, res) {
    res.render("blog/blog_details_2", {
      title: "房屋租賃契約公證",
      description: "房屋租賃契約公證服務，保障房東與房客雙方權益，約定逕受強制執行條款，避免租賃糾紛。",
      keywords: "房屋租賃契約公證,租賃契約,房東房客權益,公證服務"
    });
  },
  blogDetails3Page(req, res) {
    res.render("blog/blog_details_3", {
      title: "授權書/委託書認證",
      description: "授權書及委託書認證服務，確保文件真實性與法律效力，適用於各類授權委託事項。",
      keywords: "授權書認證,委託書認證,文件認證,公證服務"
    });
  },
  blogDetails4Page(req, res) {
    res.render("blog/blog_details_4", {
      title: "終止房屋租賃契約公證",
      description: "終止房屋租賃契約公證服務，確保終止程序合法有效，保障雙方權益，避免後續爭議。",
      keywords: "終止租賃契約公證,租約終止,公證服務"
    });
  },
  blogDetails5Page(req, res) {
    res.render("blog/blog_details_5", {
      title: "單身證明（單身切結書）認證",
      description: "單身證明及單身切結書認證服務，適用於結婚登記、財產繼承等需要單身證明文件的情況。",
      keywords: "單身證明認證,單身切結書認證,文件認證,公證服務"
    });
  },
  blogDetails6Page(req, res) {
    res.render("blog/blog_details_6", {
      title: "自書遺囑認證",
      description: "自書遺囑認證服務，確保遺囑真實性與法律效力，保障遺產分配符合當事人意願。",
      keywords: "自書遺囑認證,遺囑認證,遺產分配,公證服務"
    });
  },
  blogDetails7Page(req, res) {
    res.render("blog/blog_details_7", {
      title: "信託契約公證",
      description: "信託契約公證服務，確保信託關係合法有效，保障委託人與受益人的權益。",
      keywords: "信託契約公證,信託契約,公證服務"
    });
  },
  blogDetails8Page(req, res) {
    res.render("blog/blog_details_8", {
      title: "職務宿舍借用契約公證",
      description: "職務宿舍借用契約公證服務，適用於公務人員職務宿舍借用，確保契約合法有效。",
      keywords: "職務宿舍借用契約公證,宿舍借用契約,公證服務"
    });
  },
  blogDetails9Page(req, res) {
    res.render("blog/blog_details_9", {
      title: "離婚協議書公證",
      description: "離婚協議書公證服務，確保離婚協議內容合法有效，保障雙方權益，避免後續爭議。",
      keywords: "離婚協議書公證,離婚協議,公證服務"
    });
  },
  blogDetails10Page(req, res) {
    res.render("blog/blog_details_10", {
      title: "贈與契約公證",
      description: "贈與契約公證服務，確保贈與行為合法有效，保障贈與人與受贈人雙方權益。",
      keywords: "贈與契約公證,贈與契約,公證服務"
    });
  },
};

