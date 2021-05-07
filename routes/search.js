const express = require("express");
const router = express.Router();
const { searchController } = require("../controller");

router.get("/", (req, res) => {
  res.status(200).send("routes/search.js");
});

module.exports = router;
