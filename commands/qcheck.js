//Display the players that are currently raiding
module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  var qString = "";
  for (var i=0; i<cfg.raidQueue.length; i++) { //Loop to construct the queue list
      if (cfg.raidQueue.length == 1) {
          qString = " "+ cfg.raidQueue[0];
      } else {
          if (i!=cfg.raidQueue.length-1) {
              qString = qString+" "+ cfg.raidQueue[i]+",";
          } else {
              qString = qString+" and "+ cfg.raidQueue[i]+"!";
          }
      }
  }
  if (cfg.raidQueue.length >= 2) { //Make sure we aren't dealing with an empty queue
      message.channel.send("The players currently raiding are"+qString).catch(console.error);

  } else if (cfg.raidQueue.length == 1) {
    message.channel.send("The only player raiding is"+qString).catch(console.error);

  }
  else { //If the queue *is* empty...
    message.channel.send("Nobody is in the raiding queue! Go add some players!").catch(console.error);

  }
}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
