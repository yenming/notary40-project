"use strict";

const express = require("express");
const PageController = require("../../controllers/about");

const router = express.Router();

router.get("/", PageController.indexPage);

module.exports = router;

