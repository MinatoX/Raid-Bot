module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  for (var i = 0; i < cfg.raidQueue.length; i++) {
      if (cfg.raidQueue[i] == args[0]) { //Player found in queue!
          cfg.raidQueue.splice(i, 1); //Get rid of them
      }
  }

  //Send the message
  message.channel.send(args[0] + " has been removed from the queue!").catch(console.error);


}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
