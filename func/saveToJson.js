const path = require('path');
const fs = require('fs');

const settings = path.join(__dirname, '../data/settings.json');
const ffs = require('./ffs');

const log4js = require('log4js');
log4js.configure('./log4js.config.json');
const systemLogger = log4js.getLogger('system');


// token, tokenSecretを保存する
async function tokens (userID, token, tokenSecret) {
  let jsonObject = [];
  const now = new Date();
  const date = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " " + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);

  if (fs.existsSync(settings)) {
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    const search = jsonObject.findIndex((v) => v.id === userID);

    if (search != -1) {
      jsonObject[search].token = token;
      jsonObject[search].tokenSecret = tokenSecret;
      jsonObject[search].updated_at = date;
    } else {
      jsonObject.push({
        id: userID,
        token: token,
        tokenSecret: tokenSecret,
        created_at: date
      });
    }
  } else {
    // settings.jsonがないときの処理
    systemLogger.warn("settings.json does not exist");
    jsonObject.push({
      id: userID,
      token: token,
      tokenSecret: tokenSecret,
      created_at: date
    });
  }
  ffs.update(userID, token, tokenSecret);
  saveToJson(settings, jsonObject);
}


// keywordsを保存する
function keywords (userID, keywords) {
  let jsonObject = [];
  if (fs.existsSync(settings)) {
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    const search = jsonObject.findIndex((v) => v.id === userID);

    if (search != -1) {
      jsonObject[search].keywords = keywords;
    } else {
      jsonObject.push({
        id: userID,
        keywords,
      });
    }
  } else {
    // settings.jsonがないときの処理
    systemLogger.warn("settings.json does not exist");
    jsonObject.push({
      id: userID,
      keywords,
    });
  }

  saveToJson(settings, jsonObject);
}

// messages, min_followerを保存する
 function message (userID, message, minFollower) {
  let jsonObject = [];
  if (fs.existsSync(settings)) {
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    const search = jsonObject.findIndex((v) => v.id === userID);

    if (search != -1) {
      jsonObject[search].message = message;
      jsonObject[search].minFollower = minFollower;
    } else {
      jsonObject.push({
        id: userID,
        message,
        minFollower,
      });
    }
  } else {
    // settings.jsonがないときの処理
    systemLogger.warn("settings.json does not exist");
    jsonObject.push({
      id: userID,
      message,
      minFollower,
    });
  }

  saveToJson(settings, jsonObject);
}


// accountsを保存する
 function accounts (userID, accounts) {
  let jsonObject = [];
  if (fs.existsSync(settings)) {
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    const search = jsonObject.findIndex((v) => v.id === userID);

    if (search != -1) {
      jsonObject[search].accounts = accounts;
    } else {
      jsonObject.push({
        id: userID,
        accounts: accounts,
      });
    }
  } else {
    // settings.jsonがないときの処理
    systemLogger.warn("settings.json does not exist");
    jsonObject.push({
      id: userID,
      accounts: accounts,
    });
  }

  saveToJson(settings, jsonObject);
}

// 書き出し用の関数
function saveToJson(filename, object) {
  fs.writeFile(filename, JSON.stringify(object), (err) => {
    // 書き出しに失敗した場合
    if (err) {
      systemLogger.error(err);
      throw err;
    }
    // 書き出しに成功した場合
    else {
      systemLogger.info(filename + ' is updated');
    }
  });
}



module.exports = {
  tokens: tokens,
  keywords: keywords,
  message: message,
  accounts: accounts,
};
