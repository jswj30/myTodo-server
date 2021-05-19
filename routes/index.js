const express = require("express");
const router = express.Router();
const { indexController } = require("../controller");

router.post("/signup", indexController.signup.post);
router.post("/signin", indexController.signin.post);
router.get("/gettodo", indexController.getTodo.get);
router.post("/signout", indexController.signout.post);

module.exports = router;
