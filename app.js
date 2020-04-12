const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('./config');
const fs = require("fs");
const twitter = require('./twitter');
const url = require('url');
const saveToJson = require('./func/saveToJson')
let urlInfo;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const keywordsRouter = require('./routes/api/keywords');
const messagesRouter = require('./routes/api/messages');
const accountsRouter = require('./routes/api/accounts');
const twitterRouter = require('./routes/api/twitter');
const hotTweetsRouter = require('./routes/api/hotTweets');
const ffsRouter = require('./routes/api/ffs');

let app = express();



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
    saveToJson.tokens(profile.id, token, tokenSecret)
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

// 認証時に使う画面
app.use('/', indexRouter);
app.use('/success', usersRouter);

// twitter絡まないAPI
app.use('/api/keywords', keywordsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/accounts', accountsRouter);

// twitter絡む系API
app.use('/api/twitter', twitterRouter);
app.use('/api/hot-tweet', hotTweetsRouter);
app.use('/api/ffs', ffsRouter);

// 認証
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
