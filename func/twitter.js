const Twitter = require('twitter');
const config = require('../config');
const path = require('path');
const fs = require("fs");
const settings = path.join( __dirname, '../data/settings.json')

exports.init = function (user_id) {
  let jsonObject = {}
  try {
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));
  } catch(err) {
    console.log("エラーが発生しました。" + err)
    throw err
  }
  
  let search = jsonObject.findIndex((v) => v.id === user_id);

  var client = new Twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: jsonObject[search].token,
    access_token_secret: jsonObject[search].tokenSecret,
  });

  return client
}

exports.initWithToken = function (token, tokenSecret) {

  var client = new Twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: token,
    access_token_secret: tokenSecret,
  });

  return client
}