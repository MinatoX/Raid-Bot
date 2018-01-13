module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  cfg.boosters.push(message.member.user.username);

  let role = message.guild.roles.find("name", "Raid party");
  member.addRole(role).catch(console.error);



}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
