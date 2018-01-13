module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
      //display current callout time
      message.channel.send(`Timer is currently at ${cfg.timer} seconds!`).catch(console.error);

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
