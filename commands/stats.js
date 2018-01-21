//Tracks player stats
module.exports.run = (bot, message, args, cfg) => { //this is what will run when the command is called.

if (args[0] != "") {
  
  //Sort through each player remaining in the raid queue and add to their raid count
        
  //Structure for raidStat: cfg.raidStat = [[user, raidCount]]
        
        for (var j = 0; j < cfg.raidStat.length; j++) { //Sort through each player's stats for a matching name
          if (args[0] == cfg.raidStat[j][0]) { //If we have a name match...
            cfg.hasStat = true; //They have stats!
            message.channel.send(args[0] +" has taken part in "+cfg.raidStat[j][1]+" raids!").catch(console.error); //Create the message!
          }
        }
        if (!cfg.hasStat) { //This player does not have any stats...
          message.channel.send(args[0] +" has not taken part in any raids... :(").catch(console.error);
        }
        cfg.hasStat = false; //Reset this value for the next person
}


}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}