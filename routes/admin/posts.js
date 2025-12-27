"use strict";

const express = require("express");
const PostsController = require("../../controllers/admin/posts");
const upload = require("../../middleware/uploadPost");

const router = express.Router();

router.get("/", PostsController.list);
router.get("/create", PostsController.renderCreate);
router.post("/create", upload, PostsController.create);
router.get("/:id", PostsController.detail);
router.get("/:id/edit", PostsController.renderEdit);
router.post("/:id/edit", upload, PostsController.update);
router.post("/:id/delete", PostsController.delete);

module.exports = router;

