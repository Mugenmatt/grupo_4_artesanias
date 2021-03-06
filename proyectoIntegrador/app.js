// ************ Require's ************
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require("method-override")
const session = require('express-session');
const log = require('./middlewares/logMiddleware');
const cartMiddleware = require('./middlewares/cartMiddleware');

// Require routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const galleryRouter = require('./routes/gallery')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({secret: "ArteLibre: Shh, es un secreto!"}));

//Middlewares propios globales
app.use(log);
app.use(cartMiddleware);

// use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/gallery', galleryRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// ************ DON'T TOUCH FROM HERE ************
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;