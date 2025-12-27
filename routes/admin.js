"use strict";

const express = require("express");
const AdminController = require("../controllers/admin/admin");
const { authenticate } = require("../middleware/auth");
const userRoutes = require("./admin/users");
const announcementRoutes = require("./admin/announcements");

const router = express.Router();

router.get("/login", AdminController.renderLogin);

router.use(authenticate);

// router.get("/", AdminController.dashboard);
router.get("/dashboard", AdminController.dashboard);
router.use("/users", userRoutes);
router.use("/announcements", announcementRoutes);

module.exports = router;

