"use strict";

const express = require("express");
const UsersController = require("../../controllers/admin/users");

const router = express.Router();

router.get("/", UsersController.list);
router.get("/:id", UsersController.detail);

module.exports = router;

