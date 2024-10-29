import { engine } from 'express-handlebars';
const express = require('express')
import path from 'path'
const app = express()
const bodyParser = require('body-parser')
import router from './router'

   // 设置 Handlebars 作为模板引擎
app.engine('handlebars', engine({
  defaultLayout: false,
}));
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('view engine', 'handlebars');

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

// 设置视图文件夹
app.set('views', path.join(__dirname,'page'));
// app.set('views', './page');

app.use("/public",express.static(path.join(__dirname,'public')))
// app.use(bodyParser)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(logErrors);
// http://localhost:3000/public/image/test.png

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello worldssdasddasda')
})
app.use('/router',router)
app.listen(3000)  