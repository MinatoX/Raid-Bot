module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
//command logs that a user has boosted and adds them to the raid party
  if (args[0] === "rem"){//un do accidental boost call

    var i = cfg.boosters.indexOf(message.member.user.username);
    if(i != -1){
      cfg.boosters.splice(i,1);//removes player from boost list
    }
    var i = cfg.raidQueue.indexOf(message.member.user.username);
    if(i != -1){
      cfg.raidQueue.splice(i,1);//removes player from raidQueue
    }

    //removes raid party role
    let role = message.guild.roles.find("name", "Raid party");
    let member = message.guild.members.find(item => item.user.username === message.member.user.username);
    member.removeRole(role).catch(console.error);
    message.channel.send("You have been removed from the Raid Party and you have had your boost removed").catch(console.error);
  }else{
        for (var i=0; i<cfg.raidQueue.length + 1; i++) {

            if (message.member.user.username == cfg.raidQueue[i - 1]) { //Make sure the player isn't already in the queue

                cfg.dupe = true;
                message.channel.send("you're in the raid party");
              }
        }
        if (!cfg.dupe) { //Let the user know their player was already added to the queue!

            cfg.boosters.push(message.member.user.username);//adds player to array of players who have boosted
            cfg.raidQueue.push(message.member.user.username);//adds player to the raid queue
            let role = message.guild.roles.find("name", "Raid party");
            let member = message.member;
            if(args[0] == null){//player has boosted and is ready to raid

              member.addRole(role).catch(console.error);//add raid party role to player
              message.channel.send(`${message.member.user.username} has boosted and joined the raiding party!`).catch(console.error);

            }else if (args[0] === "nr"){//player has boosted but is not raiding

              message.channel.send(`${message.member.user.username}, thanks for the boost!`).catch(console.error);
            }else{//wrong argument was passed

              message.channel.send(`${message.member.user.username}, ${args[0]} is not a correct argument. If your not rading please use ~b nr.`).catch(console.error);

            }
        }
      }
  }
module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
