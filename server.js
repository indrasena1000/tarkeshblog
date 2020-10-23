var createError = require('http-errors');
const express = require('express')
var path = require('path');
const mongoose = require('mongoose')
var bodyParser = require('body-parser'); 
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs'); 
var cloudinary = require('cloudinary').v2;
var path = require('path'); 
var multer = require('multer'); 
require('dotenv').config();

// var storage = multer.diskStorage({ 
//   destination: (req, file, cb) => { 
//       cb(null, 'uploads') 
//   }, 
//   filename: (req, file, cb) => { 
//       cb(null, file.fieldname + '-' + Date.now()) 
//   } 
// }); 

// var upload = multer({ storage: storage }); 




const Article = require('./models/article')
const Project = require('./models/project')


const articleRouter = require('./routes/articles')
const projectRouter = require('./routes/projects')

var indexRouter = require('./routes/index');
const methodOverride = require('method-override')


const app = express()


mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.aadkh.mongodb.net/projects`, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(()=>{
  console.log("connection successful")
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json()) 
  



app.use('/articles', articleRouter)
app.use('/projects', projectRouter)
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(3007)

module.exports = app;