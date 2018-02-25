//Stops the raid calls
module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  if (cfg.activeRaid) {
      cfg.activeRaid = false;
      if (args[0] != "cancel") {
        message.channel.send('The raid is over! Thanks everyone!').catch(console.error);
      } else {
        message.channel.send("Something went wrong and the raid ended!").catch(console.error);
      }
      clearInterval(cfg.timeInt);
      cfg.timer = 0;

      //removes players in raid party role
      let role = message.guild.roles.find("name", "Raid party");

      for(var i = 0; i < cfg.raidQueue.length; i++){
          let member = message.guild.members.find(item => isUserName(item, cfg.raidQueue[i]));
          member.removeRole(role).catch(console.error);
      }


    //Track Stats
    if (args[0] != "cancel") {
      for (var i = 0; i < cfg.raidQueue.length; i++) {
        //Sort through each player remaining in the raid queue and add to their raid count

        //Structure for raidStat: cfg.raidStat = [[user, raidCount]]

        //locally store user's current raid count item
        for (var j = 0; j < cfg.raidStat.length; j++) { //Sort through each player's stats for a matching name
          if (cfg.raidQueue[i] == cfg.raidStat[j][0]) { //If we have a name match...
            cfg.hasStat = true;
            cfg.raidStat[j][1]++; //...Increment their stat count
          }
        }

        if (!cfg.hasStat) { //This person does not have established stats yet; create them!
          cfg.raidStat.push([cfg.raidQueue[i], 1]);
        }

        cfg.hasStat = false; //Reset this value for the next person
      }
    }


      cfg.raidQueue = [];
      cfg.boosters = [];
      cfg.playerAttacking = 0;

  } else {
    message.channel.send('There is no ongoing raid!').catch(console.error);

  }

}

function isUserName(item, args){//checks for nickname, if none uses username
  if(item.nickname !==null){
      if(args.toLowerCase() === item.nickname.toLowerCase() || args.toLowerCase() === item.user.username.toLowerCase()){
          return true;
      }else{
          return false;
      }
  }else if (item.user.username.toLowerCase() === args.toLowerCase()) {
      return true;
  } else {
      return false;
  }
}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
