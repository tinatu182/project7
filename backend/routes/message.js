const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/", auth, multer, messageCtrl.createMsg)
router.get("/", messageCtrl.getAllMsg)

module.exports = router