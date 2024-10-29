const express = require("express");
import { engine } from "express-handlebars";
import path from "path";
// import cors from 'cors'
// const cors = require("cors")
const app = express();
const bodyParser = require("body-parser");
import router from "./router";
import DB from './db'
import logger from "./log/logger";

// app.use(cors)

// 设置 Handlebars 作为模板引擎
app.engine(
  "handlebars",
  engine({
    defaultLayout: false,
  })
);
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("view engine", "handlebars");

function logErrors(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  // next(err);
}

// 设置视图文件夹
app.set("views", path.join(__dirname, "page"));
// app.set('views', './page');

app.use("/public", express.static(path.join(__dirname, "public")));
// app.use(bodyParser)
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(logErrors);
// http://localhost:3000/public/image/test.png

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello worldssdasddasda");
});

app.post("/post", (req, res, next) => {
  console.log(req.body);
  logger.info("请求post");
  res.json(req.body);
});


// 链式处理get post
app
  .route("/events")
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    logger.info('单一路由')
    next()
  })
  .get(function (req, res, next) {
    res.json({name:'asdasd'});
    next()
  })
  .post(function (req, res, next) {
    // maybe add a new event...
    logger.info('单一路由post请求')
  });

app.use("/router", router);
app.listen(3000);
