"use strict";

const express = require("express");
const IndexController = require("../controllers");
const authRoutes = require("./auth");
const adminRoutes = require("./admin");

const router = express.Router();

router.get("/", IndexController.index);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

module.exports = router;

