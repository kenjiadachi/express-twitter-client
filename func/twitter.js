const Twitter = require('twitter');
const path = require('path');
const fs = require('fs');
const config = require('../config');

const settings = path.join(__dirname, '../data/settings.json');

function init(userId) {
  let jsonObject = {};
  try {
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));
  } catch (err) {
    console.log(`エラーが発生しました。${err}`);
    throw err;
  }

  const search = jsonObject.findIndex((v) => v.id === userId);

  const client = new Twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: jsonObject[search].token,
    access_token_secret: jsonObject[search].tokenSecret,
  });

  return client;
}

function initWithToken(token, tokenSecret) {
  const client = new Twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: token,
    access_token_secret: tokenSecret,
  });

  return client;
}

module.exports = {
  init,
  initWithToken,
};
