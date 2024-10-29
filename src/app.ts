import { engine } from 'express-handlebars';
const express = require('express')
import path from 'path'
const app = express()
import router from './router'

   // 设置 Handlebars 作为模板引擎
app.engine('handlebars', engine({
  defaultLayout: false,
}));
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('view engine', 'handlebars');

// 设置视图文件夹
app.set('views', path.join(__dirname,'page'));
// app.set('views', './page');

app.use("/public",express.static(path.join(__dirname,'public')))

// http://localhost:3000/public/image/test.png

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello worldssdasddasda')
})
app.use('/router',router)
app.listen(3000)  