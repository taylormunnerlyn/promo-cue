var CronJob = require('cron').CronJob;
var moment = require('moment');
var cronText = require('./cronText');

var cron = function(){
  return {
    start: function(){
      console.log('hello');
      new CronJob('*/10 * * * * *', function() {
        console.log('running cron');
        cronText.run();
      }, null, true, '');
    }
  };
};

module.exports = cron();


// '00 15 12 * * 1-5'
