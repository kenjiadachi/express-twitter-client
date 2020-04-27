const path = require('path');
const fs = require('fs');

const settings = path.join(__dirname, '../data/settings.json');
const ffs = require('./ffs');


// token, tokenSecretを保存する
async function tokens (userID, token, tokenSecret, name, screenName) {
  let jsonObject = [];
  const now = new Date();
  const date = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " " + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);

  if (fs.existsSync(settings)) {
    console.log('settings.json file exists.');
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    const search = jsonObject.findIndex((v) => v.id === userID);

    if (search != -1) {
      jsonObject[search].token = token;
      jsonObject[search].tokenSecret = tokenSecret;
      jsonObject[search].name = name;
      jsonObject[search].screenName = screenName;
      jsonObject[search].updated_at = date;
    } else {
      jsonObject.push({
        id: userID,
        token: token,
        tokenSecret: tokenSecret,
        name: name,
        screen_name: screenName,
        created_at: date
      });
    }
  } else {
    // settings.jsonがないときの処理
    console.log('settings.json file does not exist');
    jsonObject.push({
      id: userID,
      token: token,
      tokenSecret: tokenSecret,
      name: name,
      screen_name: screenName,
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
        accounts: accounts,
      });
    }
  } else {
    // settings.jsonがないときの処理
    console.log('settings.json file does not exist');
    jsonObject.push({
      id: userID,
      accounts: accounts,
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
