const express = require("express");
const app = express();
const port = 5000;

// middleware
// const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

// middleware 사용
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    preflightContinue: true,
  })
);

// routing
const indexRouter = require("./routes/index");
const searchRouter = require("./routes/search");

app.use("/", indexRouter);
app.use("/search", searchRouter);

// get, post
app.get("/", (req, res) => {
  res.status(200).send("hello World");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
