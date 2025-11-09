"use strict";

const express = require("express");
const AuthController = require("../controllers/auth");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/login", AuthController.renderLogin);
router.post("/login", AuthController.login);
router.get("/register", AuthController.renderRegister);
router.post("/register", AuthController.register);
router.get("/profile", authenticate, AuthController.profile);
router.post("/logout", authenticate, AuthController.logout);

module.exports = router;

