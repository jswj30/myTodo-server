const express = require("express");
const app = express();
const port = 3000;

// middleware
const bodyParser = require("body-parser");

// middleware 사용
app.use(bodyParser.json());
app.use(bpdyParser.urlencoded({ extends: false }));

// routing
app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
