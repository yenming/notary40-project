"use strict";

const express = require("express");
const PageController = require("../../controllers/contact");

const router = express.Router();

router.get("/", PageController.indexPage);

module.exports = router;

