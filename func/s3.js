const config = require('../config');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

function init() {
  const client = new AWS.S3({
    accessKeyId: config.awsAccessKey,
    secretAccessKey: config.awsAccessSecret,
    region: config.awsRegion,
  });

  return client;
}

function getBucketList() {
  const client = init();
  client.listBuckets(function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
}

function createBucket() {
  const client = init();
  var bucketParams = {
    Bucket : process.argv[2],
    ACL : 'public-read'
  };
  client.createBucket(bucketParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Location);
    }
  });
}

function upload(bucketName, filepath) {
  const client = init();
  var params = {
    Bucket: bucketName,
    Key: "sample.png"
  };
  var v = fs.readFileSync(filepath);
  params.Body=v;
  client.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });
}

function download(filename) {
  const client = init();
  var params = {
    Bucket: config.awsBucketName,
    Key: filename
  };

  client.getObject(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      fs.writeFileSync(path.join( __dirname, '../uploads/', filename), data.Body);
    }
  });
}

module.exports = {
  getBucketList: getBucketList,
  createBucket: createBucket,
  upload: upload,
  download: download
};