//OPTIONAL ARG [REFRESH] //Skips to the next call
module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
    //OPTIONAL ARG [REFRESH] //Skips to the next call
      if (cfg.activeRaid) {
          if (args[0] != 'refresh') {
              cfg.timer = cfg.callTime;
          } else {
              cfg.timer = cfg.refreshTime;
          }
      }

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
