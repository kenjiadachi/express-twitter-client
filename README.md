# express-twitter-client
Node+Expressで作ったTwitterAPIを触る系プログラムです。


## usage

- create twitter apps, write ./config.js

https://apps.twitter.com/app/new

```
exports.consumerKey = '';
exports.consumerSecret = '';
exports.callbackURL = '';
exports.awsAccessKey = '';
exports.awsAccessSecret = '';
exports.awsRegion = '';
exports.awsBucketName = '';
```

- create dirs

```
mkdir data
mkdir data/ffs
mkdir data/reserved-tweets
mkdir data/rss

mkdir logs
mkdir logs/dm-logs
mkdir logs/follow-logs
mkdir logs/follower-likes
mkdir logs/like-logs
mkdir logs/rss-logs
mkdir logs/rss-logs
mkdir logs/unfollow-logs

mkdir uploads
```


```
npm install
npm start
# start http server at localhost:3000
```
