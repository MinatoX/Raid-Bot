module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
      //resume callout timer
      cfg.timeInt = setInterval(cfg.time, 1000);
      message.channel.send("Raiding has been resumed! Fight on Knights!").catch(console.error);


}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
