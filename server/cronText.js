var Process = require('./cronProcess');

var cronText =  function(){
  return {
    run: function(){
      Process.sendMessage();
    }
  };
};

module.exports = cronText();
