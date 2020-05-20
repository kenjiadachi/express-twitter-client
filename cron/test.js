const schedule = require('node-schedule');
const follow = require('../batch/follow');
const like = require('../batch/like');
const sendDM = require('../batch/sendDM');
const unfollow = require('../batch/unfollow');
const ffs = require('../batch/ffs');
const createFavList = require('../batch/createFavList');
const rss = require('../batch/rss');
const log4js = require('log4js');
log4js.configure('./log4js.config.json');
const systemLogger = log4js.getLogger('system');

systemLogger.info("cron/test start!");

// 毎時0分にフォロー
schedule.scheduleJob('0 0 * * * *', () => {
  systemLogger.info("cron/follow start!");
  follow.main();
});

// 毎時5分にいいね
schedule.scheduleJob('0 5 * * * *', () => {
  systemLogger.info("cron/like start!");
  like.main();
});

// 毎時10分にDM送信
schedule.scheduleJob('0 10 * * * *', () => {
  systemLogger.info("cron/sendDM start!");
  sendDM.main();
});

// 毎時15分にアンフォロー
schedule.scheduleJob('0 15 * * * *', () => {
  systemLogger.info("cron/unfollow start!");
  unfollow.main();
});

// 毎時20分にffs更新
schedule.scheduleJob('0 20 * * * *', () => {
  systemLogger.info("cron/ffs start!");
  ffs.main();
});

// 毎時25分にいいねリスト作成
schedule.scheduleJob('0 25 * * * *', () => {
  systemLogger.info("cron/createFavList start!");
  createFavList.main();
});

// 30分おきにrss実行
schedule.scheduleJob('0 */30 * * * *', () => {
  systemLogger.info("cron/rss start!");
  rss.main();
});