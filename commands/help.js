//Display all of our commands!
module.exports.run = (client,message,args, cfg) => {
   message.channel.send({embed:{
      description:`\nAvailable commands:
      \n~q [PLAYER(S)]: Adds player(s) to the raid queue
      \n~qcheck: Lists all players queued
      \n~qclear: Removes all players from raid queue
      \n~qremove [PLAYER]: Removes player from the raid queue
      \n~raidstart [TEMPLARS/PALADINS]: Starts the raid callouts for the respective group
      \n~raidstop: Ends the raid callouts
      \n~calltime [SECONDS]: Resets call time in seconds. Leaving the argument empty will display current time.
      \n~refreshtime [SECONDS]: Same as above but for the refresh timer
      \n~skip: Skips to the next player in the raid queue. Does nothing if there is not a raid going on.
      \n~pause: Stops the timer
      \n~resume: Start the timer again
      \n~timer: Check the current time in seconds
      \n~reset: Sets timer to 0
      \n~b: Tells Bot you have boosted
      \n~chkboost: See which members have boosted`,
      color: 0x17A589
    }});
  };




module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)
    //command = "help"
}
