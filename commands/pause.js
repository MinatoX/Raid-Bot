module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
      //pause the callout timer
      console.log(cfg.timeInt);
      clearInterval(cfg.timeInt);
      message.channel.send("Raiding paused! Take it easy for a bit guys!").catch(console.error);

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
