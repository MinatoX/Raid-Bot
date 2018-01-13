module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  var qString = "Players who have boosted: ";
  for (var i=0; i<cfg.boosters.length; i++) { //Loop to construct the queue list
      if (cfg.boosters.length == 1) {
          qString = qString + cfg.boosters[0];
      } else {
          if (i!=cfg.boosters.length-1) {
              qString = qString+" "+ cfg.boosters[i]+",";
          } else {
              qString = qString+" and "+ cfg.boosters[i]+"!";
          }
      }
  }
  message.channel.send(qString).catch(console.error);

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
