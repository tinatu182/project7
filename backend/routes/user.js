const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
// const password = require("../middleware/password");

router.post("/signup", userCtrl.signUp)
router.post("/login", userCtrl.logIn)
router.delete("/:id", auth, userCtrl.deleteUser);
router.put("/:id", multer, userCtrl.userEdit) // no longer user
router.get("/", auth, userCtrl.getAuth)

module.exports = router