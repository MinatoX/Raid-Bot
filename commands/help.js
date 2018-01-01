module.exports.reun = async (bot, message, args) => { //this is what will run when the command is called.

    message.channel.send({embed:{
      description:"Available commands:\n\n~q [PLAYER(S)]: Adds player(s) to the raid queue\n\n~qcheck: Lists all players queued\n\n~qclear: Removes all players from raid queue\n\n~qremove [PLAYER]: Removes player from the raid queue\n\n~raidstart [TEMPLARS/PALADINS]: Starts the raid callouts for the respective group\n\n~raidstop: Ends the raid callouts\n\n~calltime [SECONDS]: Resets call time in seconds. Leaving the argument empty will display current time.\n\n~refreshtime [SECONDS]: Same as above but for the refresh timer\n\n~skip: Skips to the next player in the raid queue. Does nothing if there is not a raid going on.\n\n~pause: Stops the timer\n\n~resume: Start the timer again\n\n~timer: Check the current time in seconds\n\n~reset: Sets timer to 0",
      color: 0x17A589
    }})

}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)
    command = "help"
}
