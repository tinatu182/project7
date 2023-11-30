const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
// const password = require("../middleware/password");

router.post("/signup", userCtrl.signUp)
router.post("/login", userCtrl.logIn)
// router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router