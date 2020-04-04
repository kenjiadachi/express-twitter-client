const Twitter = require('twitter');
const config = require('./config');
const fs = require("fs");


const filepath = '/data/secret.json'
  let jsonObject = {}
  try {
    jsonObject = JSON.parse(fs.readFileSync(__dirname + filepath, 'utf8'));
    console.log(jsonObject)
  } catch(err) {
    console.log("エラーが発生しました。" + err)
    throw err
  }

var client = new Twitter({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumerSecret,
  access_token_key: jsonObject["749128445167214593"]["token"],
  access_token_secret: jsonObject["749128445167214593"]["tokenSecret"],
});

//キーワードで検索
function search(urlInfo, callback){
  var options = {};
  if( urlInfo.query.q ) {
    options.q = urlInfo.query.q
  }
  if( urlInfo.query.count ) {
    options.count = urlInfo.query.count
  }
  client.get('search/tweets', options, function(error, tweets, response){
    callback(tweets);
  });
}

module.exports = {
    search: search
}