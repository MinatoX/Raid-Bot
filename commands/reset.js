module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  //reset callout timer
  timer = 0;
  message.channel.send("Timer has been reset!").catch(console.error);


}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
