"use strict";

const express = require("express");
const IndexController = require("../controllers");
const BlogController = require("../controllers/blog");
const AuthController = require("../controllers/auth");
const authRoutes = require("./auth");
const adminRoutes = require("./admin");

const router = express.Router();

router.get("/", IndexController.index);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

// Redirect /login to /auth/login for convenience
router.get("/login", AuthController.renderLogin);
router.post("/login", AuthController.login);

// Blog details routes (without /blog prefix)
router.get("/blog_details", BlogController.blogDetailsPage);
router.get("/blog_details_2", BlogController.blogDetails2Page);
router.get("/blog_details_3", BlogController.blogDetails3Page);
router.get("/blog_details_4", BlogController.blogDetails4Page);
router.get("/blog_details_5", BlogController.blogDetails5Page);
router.get("/blog_details_6", BlogController.blogDetails6Page);
router.get("/blog_details_7", BlogController.blogDetails7Page);
router.get("/blog_details_8", BlogController.blogDetails8Page);
router.get("/blog_details_9", BlogController.blogDetails9Page);
router.get("/blog_details_10", BlogController.blogDetails10Page);

module.exports = router;

