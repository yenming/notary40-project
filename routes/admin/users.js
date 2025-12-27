"use strict";

const express = require("express");
const UsersController = require("../../controllers/admin/users");

const router = express.Router();

router.get("/", UsersController.list);
router.get("/create", UsersController.renderCreate);
router.post("/create", UsersController.create);
router.get("/:id", UsersController.detail);
router.get("/:id/edit", UsersController.renderEdit);
router.post("/:id/edit", UsersController.update);
router.post("/:id/delete", UsersController.delete);

module.exports = router;

