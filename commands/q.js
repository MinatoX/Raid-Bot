//ARG [PLAYERNAME] //Add a player to the queue
module.exports.run = async (bot, message, args,cfg) => { //this is what will run when the command is called.
  //command logs that a user has boosted and adds them to the raid party
  var response = "";
  var nonMember = "";
  var name;
  var role = message.guild.roles.find("name", "Raid party");
  if(args[0] == null){
      if(message.member.nickname == null){
              name = message.member.user.username;
      }else{
              name = message.member.nickname;
      }
      console.log(name);
      if (duep(name, cfg)) { //Let the user know their player was added to the queue!

        message.channel.send("you're in the raid party");
      }else{
          cfg.raidQueue.push(name);//adds player to the raid queue
          let member = message.member;

          member.addRole(role).catch(console.error);//add raid party role to player
          message.channel.send(`${name} has joined the raiding party!`).catch(console.error);

      }

  }else{

        if(args[0] === "rem"){
                console.log("in rem");
                if(message.member.nickname == null){
                        var i = cfg.raidQueue.indexOf(message.member.user.username);
                }else{
                        var i = cfg.raidQueue.indexOf(message.member.nickname);
                }
                if(i != -1){
                        cfg.raidQueue.splice(i,1);//removes player from raidQueue
                }

                //removes raid party role
                message.member.removeRole(role).catch(console.error);
                message.channel.send("You have left the Raid Party").catch(console.error);

        }else{
              for(var i = 0; i<args.length; i++){
                        member = message.guild.members.find(item => isUserName(item, args[i]));
                        if(member !== null){
                              if(member.nickname == null){
                                      name = member.user.username;
                              }else{
                                      name = member.nickname;
                              }

                            	if(duep(name, cfg)){
                                            message.channel.send(`${args[i]} is in the raid party`);

                              }else{

                                    member.addRole(role).catch(console.error);
                              			if(member.nickname == null){
                                          cfg.raidQueue.push(member.user.username);//adds player to the raid queue
                                  				response += `${member.user.username} `;
                              			}else{
                                  	      cfg.raidQueue.push(member.nickname);//adds player to the raid queue
                                  				response += `${member.nickname} `;
                              			}

                              }
                        }else{
                          nonMember += `${args[i]} `;

                        }

                }
                if(response !== ""){
                	message.channel.send(`${response} have been added.`).catch(console.error);
                }
                if(nonMember !== ""){
                	message.channel.send(`argument not valid: ${nonMember}`).catch(console.error);
                }
        }

  }





    function duep(args, cfg){//checks for dueplicate queues
      if(cfg.raidQueue.length !== 0){
          for (var i=0; i<cfg.raidQueue.length; i++) {

              if (args.toLowerCase() === cfg.raidQueue[i].toLowerCase()) { //Make sure the player isn't already in the queue

                  return true;//player is already queued
              }
          }
        }
        return false;
    }

    function isUserName(item, args){//checks for a nickname, if not uses username
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

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
