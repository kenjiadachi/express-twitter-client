const Twitter = require('twitter');
const Twit = require('twit');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const log4js = require('log4js');
log4js.configure('./log4js.config.json');
const systemLogger = log4js.getLogger('system');

const settings = path.join(__dirname, '../data/settings.json');

function init(userId) {
  let jsonObject = {};
  try {
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));
  } catch (err) {
    systemLogger.error(err);
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

function initByTwit(userID) {
  let jsonObject = {};
  try {
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));
  } catch (err) {
    systemLogger.error(err);
    throw err;
  }

  const search = jsonObject.findIndex((v) => v.id === userID);

  const client = new Twit({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token: jsonObject[search].token,
    access_token_secret: jsonObject[search].tokenSecret,
  });

  return client;
}

function initByTwitWithToken(token, tokenSecret) {
  const client = new Twit({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token: token,
    access_token_secret: tokenSecret,
  });

  return client;
}

module.exports = {
  init,
  initWithToken,
  initByTwit,
  initByTwitWithToken
};