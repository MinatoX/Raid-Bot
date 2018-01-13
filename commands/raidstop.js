//Stops the raid calls
module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  if (cfg.activeRaid) {
      cfg.activeRaid = false;
      message.channel.send('The raid is over! Thanks everyone!').catch(console.error);
      clearInterval(cfg.timeInt);
      cfg.timer = 0;

  } else {
    message.channel.send('There is no ongoing raid!').catch(console.error);

  }

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
