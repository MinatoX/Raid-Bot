//OPTIONAL ARG [SECONDS] //Set or check the call time
module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  if (isNaN(args[0])) {
        message.channel.send(`The current call time is set to ${cfg.callTime} seconds!`)

  } else {
      cfg.callTime = Number(args[0]);
      message.channel.send(`The new call time is set to ${cfg.callTime} seconds!`)

  }

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
