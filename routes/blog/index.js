"use strict";

const express = require("express");
const PageController = require("../../controllers/blog");

const router = express.Router();

router.get("/", PageController.indexPage);
// 保留舊的靜態路由（向後兼容，必須放在動態路由之前）
router.get("/blog_details", PageController.blogDetailsPage);
router.get("/blog_details_2", PageController.blogDetails2Page);
router.get("/blog_details_3", PageController.blogDetails3Page);
router.get("/blog_details_4", PageController.blogDetails4Page);
router.get("/blog_details_5", PageController.blogDetails5Page);
router.get("/blog_details_6", PageController.blogDetails6Page);
router.get("/blog_details_7", PageController.blogDetails7Page);
router.get("/blog_details_8", PageController.blogDetails8Page);
router.get("/blog_details_9", PageController.blogDetails9Page);
router.get("/blog_details_10", PageController.blogDetails10Page);
// 動態文章路由（使用 slug，必須放在最後）
router.get("/:slug", PageController.blogDetailsPage);
module.exports = router;

