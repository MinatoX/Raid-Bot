//OPTIONAL ARG [SECONDS] //Set or check the refresh time
module.exports.run = async (bot, message, args, cfg) => { //this is what will run when the command is called.
    //OPTIONAL ARG [SECONDS] //Set or check the refresh time
      if (isNaN(args[0])) {
        message.channel.send(`The current refresh time is set to ${cfg.refreshTime} seconds!`).catch(console.error);

      } else {
          cfg.refreshTime = Number(args[0]);
          message.channel.send(`The new refresh time is set to ${cfg.refreshTime} seconds!`).catch(console.error);

      }

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
