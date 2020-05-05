const schedule = require('node-schedule');
const child_process = require('child_process');

schedule.scheduleJob('*/5 * * * * *', () => {
  var proc = child_process.exec('echo Hello!');
  proc.stdout.on('data', (data) => {
      console.log(data);
  });
});