const path = require('path');
const fs = require('fs');

const settings = path.join(__dirname, '../data/settings.json');
const ffs = require('./ffs');


// token, tokenSecretを保存する
async function tokens (userID, token, tokenSecret) {
  let jsonObject = [];
  if (fs.existsSync(settings)) {
    console.log('settings.json file exists.');
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    const search = jsonObject.findIndex((v) => v.id === userID);

    if (search != -1) {
      jsonObject[search].token = token;
      jsonObject[search].tokenSecret = tokenSecret;
    } else {
      jsonObject.push({
        id: userID,
        token,
        tokenSecret,
      });
    }
  } else {
    // settings.jsonがないときの処理
    console.log('settings.json file does not exist');
    jsonObject.push({
      id: userID,
      token,
      tokenSecret,
    });
  }
  ffs.update(userID, token, tokenSecret);
  saveToJson(settings, jsonObject);
}


// keywordsを保存する
function keywords (userID, keywords) {
  let jsonObject = [];
  if (fs.existsSync(settings)) {
    console.log('settings.json file exists.');
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    const search = jsonObject.findIndex((v) => v.id === userID);

    if (search != -1) {
      console.log(jsonObject[search].keywords);
      jsonObject[search].keywords = keywords;
    } else {
      jsonObject.push({
        id: userID,
        keywords,
      });
    }
  } else {
    // settings.jsonがないときの処理
    console.log('settings.json file does not exist');
    jsonObject.push({
      id: userID,
      keywords,
    });
    console.log(jsonObject);
  }

  saveToJson(settings, jsonObject);
}

// messages, min_followerを保存する
 function message (userID, message, minFollower) {
  let jsonObject = [];
  if (fs.existsSync(settings)) {
    console.log('settings.json file exists.');
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    const search = jsonObject.findIndex((v) => v.id === userID);

    if (search != -1) {
      console.log(jsonObject[search].message);
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
    console.log('settings.json file does not exist');
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
    console.log('settings.json file exists.');
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    const search = jsonObject.findIndex((v) => v.id === userID);

    if (search != -1) {
      console.log(jsonObject[search].accounts);
      jsonObject[search].accounts = accounts;
    } else {
      jsonObject.push({
        id: userID,
        accounts,
      });
    }
  } else {
    // settings.jsonがないときの処理
    console.log('settings.json file does not exist');
    jsonObject.push({
      id: userID,
      accounts,
    });
    console.log(jsonObject);
  }

  saveToJson(settings, jsonObject);
}

// 書き出し用の関数
function saveToJson(filename, object) {
  fs.writeFile(filename, JSON.stringify(object), (err) => {
    // 書き出しに失敗した場合
    if (err) {
      console.log(`エラーが発生しました。${err}`);
      throw err;
    }
    // 書き出しに成功した場合
    else {
      console.log('ファイルが正常に書き出しされました');
    }
  });
}



module.exports = {
  tokens: tokens,
  keywords: keywords,
  message: message,
  accounts: accounts,
};