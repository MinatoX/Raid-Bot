//Clear the entire raid queue
module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  cfg.raidQueue = [];

  //Send the message
  message.channel.send("The raiding queue has been cleared!").catch(console.error);


}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
