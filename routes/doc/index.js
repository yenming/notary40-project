"use strict";

const express = require("express");
const PageController = require("../../controllers/doc");

const router = express.Router();

router.get("/", PageController.indexPage);

module.exports = router;

