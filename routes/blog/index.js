"use strict";

const express = require("express");
const PageController = require("../../controllers/blog");

const router = express.Router();

router.get("/", PageController.indexPage);
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
module.exports = router;

