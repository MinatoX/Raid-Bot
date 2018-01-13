module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  if (!cfg.activeRaid) {
    message.channel.send("You can only use this command during an ongoing raid!").catch(console.error);

  }

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
