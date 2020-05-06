const schedule = require('node-schedule');
// const child_process = require('child_process');
const follow = require('../batch/follow');
const like = require('../batch/like');
const sendDM = require('../batch/sendDM');
const unfollow = require('../batch/unfollow');
const ffs = require('../batch/ffs');
const createFavList = require('../batch/createFavList');
const rss = require('../batch/rss');

// 毎時0分にフォロー
schedule.scheduleJob('0 0 * * * *', () => {
  follow.main();
});

// 毎時5分にいいね
schedule.scheduleJob('0 5 * * * *', () => {
  like.main();
});

// 毎時10分にDM送信
schedule.scheduleJob('0 10 * * * *', () => {
  sendDM.main();
});

// 毎時15分にアンフォロー
schedule.scheduleJob('0 15 * * * *', () => {
  unfollow.main();
});

// 毎時20分にffs更新
schedule.scheduleJob('0 20 * * * *', () => {
  ffs.main();
});

// 毎時25分にいいねリスト作成
schedule.scheduleJob('0 25 * * * *', () => {
  createFavList.main();
});

// 30分おきにrss実行
schedule.scheduleJob('* */30 * * * *', () => {
  rss.main();
});