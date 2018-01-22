//ARG [TEMPLARS OR PALADINS] //Starts the raid calls
module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
  //var logger = require('winston');

   cfg.time = function() { //We're doing our callouts here!
      cfg.timer++; //Increment our timer...
      cfg.logger.info(cfg.timer);
      if (cfg.timer > cfg.refreshTime && cfg.refresh) { //If we exceed our refresh timer during a refresh...
          cfg.refresh = false; //...stop the refresh
      } else if (cfg.timer > cfg.callTime && !cfg.refresh) { //If our timer exceeds our calltimer, send a new raid notification!
        message.channel.send("Attack "+cfg.raidQueue[cfg.playerAttacking]+"'s boss, "+cfg.currentID+"!").catch(console.error);//Make the callout

          cfg.timer = 0; //Reset our timer
          cfg.playerAttacking++; //Change the player in the queue
          if (cfg.playerAttacking > cfg.raidQueue.length-1) { //We've reached the end of the queue!
              cfg.playerAttacking = 0; //Start back from the beginning!
              cfg.refresh = true; //Give players the chance to summon new raid bosses
              message.channel.send("Refresh your bosses "+cfg.currentID+"!" ).catch(console.error);//Replace brackets w/ appropriate role ID

          }
      }
  };

  //ARG [TEMPLARS OR PALADINS] //Starts the raid calls
     if (!cfg.activeRaid && cfg.raidQueue.length > 0 ) {
         cfg.activeRaid = true;
         cfg.currentID = message.guild.roles.find("name", "Raid party");
         cfg.NOTIFY_CHANNEL = cfg.channelID;
         message.channel.send('Starting the raid! Type "raidstop" to stop the raid. Callouts are made every ' +cfg.callTime+ ' seconds with a refresh time at the end of the queue set to ' +cfg.refreshTime+ ' seconds.').catch(console.error);

         cfg.timeInt = setInterval(cfg.time, 1000);
     } else {
       console.log(args);
       message.channel.send('Something went wrong! Make sure there is not an ongoing raid or an empty raid queue! Be sure to also specify "Templars" or "Paladins"!').catch(console.error);

     }

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
