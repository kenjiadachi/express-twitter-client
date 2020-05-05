const schedule = require('node-schedule');
// const child_process = require('child_process');
const follow = require('../batch/follow');
const like = require('../batch/like');
const sendDM = require('../batch/sendDM');
const unfollow = require('../batch/unfollow');
const ffs = require('../batch/ffs');
const createFavList = require('../batch/createFavList');
const rss = require('../batch/rss');

// 毎週日曜日の2時にフォロー
schedule.scheduleJob('0 0 2 0 0 0', () => {
  follow.main();
});

// 毎週月曜日の2時にいいね
schedule.scheduleJob('0 0 2 0 0 1', () => {
  like.main();
});

// 毎週火曜日の2時にDM送信
schedule.scheduleJob('0 0 2 0 0 2', () => {
  sendDM.main();
});

// 毎週水曜日の2時にフォロー
schedule.scheduleJob('0 0 2 0 0 3', () => {
  follow.main();
});

// 毎週木曜日の2時にいいね
schedule.scheduleJob('0 0 2 0 0 4', () => {
  like.main();
});

// 毎週金曜日の2時にアンフォロー
schedule.scheduleJob('0 0 2 0 0 5', () => {
  unfollow.main();
});

// 毎日4時にffs
schedule.scheduleJob('* * 4 * * *', () => {
  ffs.main();
});

// 毎日6時にいいねリスト作成
schedule.scheduleJob('* * 4 * * *', () => {
  createFavList.main();
});

// 30分おきにrss実行
schedule.scheduleJob('* */30 * * * *', () => {
  rss.main();
});