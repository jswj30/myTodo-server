const express = require("express");
const router = express.Router();
const { indexController } = require("../controller");

router.get("/", (req, res) => {
  res.status(200).send("routes/index.js");
});

module.exports = router;
