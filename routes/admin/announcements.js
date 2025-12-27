"use strict";

const express = require("express");
const AnnouncementsController = require("../../controllers/admin/announcements");
const upload = require("../../middleware/upload");

const router = express.Router();

router.get("/", AnnouncementsController.list);
router.get("/create", AnnouncementsController.renderCreate);
router.post("/create", upload, AnnouncementsController.create);
router.get("/:id", AnnouncementsController.detail);
router.get("/:id/edit", AnnouncementsController.renderEdit);
router.post("/:id/edit", upload, AnnouncementsController.update);
router.post("/:id/delete", AnnouncementsController.delete);

module.exports = router;

