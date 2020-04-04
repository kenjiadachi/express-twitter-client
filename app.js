var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var config = require('./config');
const fs = require("fs");
var twitter = require('./twitter');
var url = require('url');
var urlInfo;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.all('/api/*', function(request, response, next){
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(request.url, true);
  // jsonでレスポンス（外部の人もアクセスできるようにAccess-Control-Allow-Originを設定）
  response.contentType('json');
  response.header('Access-Control-Allow-Origin', '*');
  next();
});

// passport-twitterの設定
passport.use(new TwitterStrategy({
    consumerKey: config.consumerKey,
    consumerSecret: config.consumerSecret,
    callbackURL: config.callbackURL
  },
  // 認証後の処理
  function(token, tokenSecret, profile, done) {
    // tokenを./data/settings.jsonに保存
    
    return done(null, profile);
  }
));
// セッションに保存
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.use('/', indexRouter);
app.use('/success', usersRouter);
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/?auth_failed' }),
  function (req, res) {
    res.redirect('/success');
  }
);
app.get('/api/twitter/search', function(request, response) {
  twitter.search(urlInfo,
      function(result){
          response.send(result);
      }
  );
});




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

module.exports = app;
