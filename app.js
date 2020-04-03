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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
    // tokenを./data/secret.jsonに保存
    const filepath = '/data/secret.json'
    let jsonObject = {}
    if (fs.statSync(__dirname + filepath)) {
      jsonObject = JSON.parse(fs.readFileSync(__dirname + filepath, 'utf8'));
      console.log(jsonObject)
    } else {
      
      console.log(jsonObject)
    }
    console.log(jsonObject)
    jsonObject[profile.id] = {
      token: token,
      tokenSecret: tokenSecret
    }
    // ファイルを書き込む
    fs.writeFile( __dirname + filepath, JSON.stringify(jsonObject) , (err) => {
      // 書き出しに失敗した場合
      if(err){
        console.log("エラーが発生しました。" + err)
        throw err
      }
      // 書き出しに成功した場合
      else{
        console.log("ファイルが正常に書き出しされました")
      }
    });
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
