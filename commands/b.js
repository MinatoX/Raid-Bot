module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
//command logs that a user has boosted and adds them to the raid party
  cfg.boosters.push(message.member.user.username);//adds player to array of players who have boosted
  cfg.raidQueue.push(message.member.user.username);//adds player to the raid queue
  if(args[0] == null){//player has boosted and is ready to raid

  let role = message.guild.roles.find("name", "Raid party");
  let member = message.member;

  member.addRole(role).catch(console.error);//add raid party role to player
  message.channel.send(`${message.member.user.username} has boosted and joined the raiding party!`).catch(console.error);

}else if (args[0] === "nr"){//player has boosted but is not raiding

  message.channel.send(`${message.member.user.username}, thanks for the boost!`).catch(console.error);
}else{//wrong argument was passed

  message.channel.send(`${message.member.user.username}, ${args[0]} is not a correct argument. If your not rading please use ~b nr.`).catch(console.error);

}




}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
