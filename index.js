const express = require("express");
const app = express();
const port = 3000;

// middleware
// const bodyParser = require("body-parser");
const cors = require("cors");

// middleware 사용
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, HEAD, PUT, PATCH, DELETE",
    credentials: true,
  })
);

// routing
app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
