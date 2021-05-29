const express = require("express");
const router = express.Router();
const { searchController } = require("../controller");

router.post("/mypage", searchController.mypage.post);

module.exports = router;
