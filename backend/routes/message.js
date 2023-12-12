const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message");
const multer = require('../middleware/multer-config');

router.post("/", multer, messageCtrl.createMsg)
router.get("/", messageCtrl.getAllMsg)
router.patch("/comment-post/:id", messageCtrl.commentPost);

module.exports = router