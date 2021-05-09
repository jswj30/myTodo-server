const express = require("express");
const router = express.Router();
const { indexController } = require("../controller");

router.post("/signup", indexController.signup.post);

module.exports = router;
