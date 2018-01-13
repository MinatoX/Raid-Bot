//Mandatory Discord variables
//var Discord = require('discord.io'); (og)
var logger = require('winston');
var auth = require('./auth.json');
const {Client} = require('discord.js');
const bot = new Client();
var cfg = require('./variables.json');//holds all variables used(jaja)
var fs = require('fs');// needed node.js package(jaja)


//My own bot variables
/*
raidQueue - Contains all raiding players
dupe - For duplicate names
callTime - Time in seconds between callouts
refreshTime - Time in seconds for refreshing bosses

activeRaid - Are we currently raiding?
timer - Countdown until we move on
timeInt - Holds the interval for our time function

playerAttacking - Which player's raid boss are we currently attacking?
refresh - Are we doing a refresh?
templarID - role id
paladinID - role id
NOTIFY_CHANNEL - Channel we are posting our call messages in
*/

var currentID = cfg.paladinID;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//command handler
bot.on('ready', () => {
});

bot.on('message', msg => {
  if(msg.author.bot || !msg.content.startsWith(cfg.prefix)) return;
  const args = msg.content.slice(cfg.prefix.length).split(/ +/);//set args to hold parameter passed in message(jaja)
  const cmd = args.shift().toLowerCase();//sets cmd to command specified in message(jaja)
  try {
  let commandFile = require(`./commands/${cmd}.js`);//sets commandFile to path for needed js file(jaja)
  commandFile.run(bot, msg, args, cfg);//runs command called(jaja)
} catch (err) {
  console.error(err);
}
});















/*
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) { //Log bot info on launch
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');

    bot.setPresence({game: {name: "KHUx | ~help for help", type: 0}});
});

var time = function() { //We're doing our callouts here!
    timer++; //Increment our timer...
    logger.info(timer);
    if (timer > refreshTime && refresh) { //If we exceed our refresh timer during a refresh...
        refresh = false; //...stop the refresh
    } else if (timer > callTime && !refresh) { //If our timer exceeds our calltimer, send a new raid notification!
        bot.sendMessage({ //Notify everyone
            to: NOTIFY_CHANNEL,
            message: "Attack "+raidQueue[playerAttacking]+"'s boss, "+currentID+"!" //Make the callout
        });
        timer = 0; //Reset our timer
        playerAttacking++; //Change the player in the queue
        if (playerAttacking > raidQueue.length-1) { //We've reached the end of the queue!
            playerAttacking = 0; //Start back from the beginning!
            refresh = true; //Give players the chance to summon new raid bosses
            bot.sendMessage({ //Notify everyone
                to: NOTIFY_CHANNEL,
                message: "Refresh your bosses "+currentID+"!" //Replace brackets w/ appropriate role ID
            });
        }
    }
};

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `~`

    if (message.substring(0, 1) == '~' &&  user!=bot.username) { //For now, all of our bot commands will start with a ~
        var args = message.substring(1).split(' '); //Allows arguments to be a thing
        var cmd = args[0]; //args[0] will be our initial command
        switch(cmd) {

            //QUEUE COMMANDS//

            case 'q': //ARG [PLAYERNAME] //Add a player to the queue
                for (var i=0; i<raidQueue.length; i++) {
                    if (args[1] == raidQueue[i]) { //Make sure the player isn't already in the queue
                        dupe = true;
                    }
                }

                if (args[1] != "" && !dupe) { //Let the user know their player was added to the queue!

                    var addQ = ""; //The message our bot will be displaying

                    if (args.length > 2) {
                        for (var i = 1; i < args.length; i++) { //Add multiple names if any
                            raidQueue.push(args[i]);
                            if (i != args.length-1) {
                                addQ = addQ+args[i]+", ";
                            } else {
                                addQ = addQ+"and "+args[i];
                            }
                        }
                        addQ = addQ+" have been added to the queue!";
                    } else {
                        raidQueue.push(args[1]);
                        addQ = args[1] + " has been added to the queue!";
                    }

                    bot.sendMessage({
                        to: channelID,
                        message: addQ
                    });
                } else if (dupe) { //Send the duplicate player error
                    bot.sendMessage({
                        to: channelID,
                        message: "That player is already in the raid queue!"
                    });
                    dupe = false; //Now that they know, we can reset this bool
                } else { //Assume the user didn't put in a proper name
                    bot.sendMessage({
                        to: channelID,
                        message: "You didn't specify who should be queued!"
                    });
                }
            break;

            case 'qcheck': //Display the players that are currently raiding
                var qString = "";
                for (var i=0; i<raidQueue.length; i++) { //Loop to construct the queue list
                    if (raidQueue.length == 1) {
                        qString = " "+raidQueue[0];
                    } else {
                        if (i!=raidQueue.length-1) {
                            qString = qString+" "+raidQueue[i]+",";
                        } else {
                            qString = qString+" and "+raidQueue[i]+"!";
                        }
                    }
                }

                if (raidQueue.length !== 0 || raidQueue.length != 1) { //Make sure we aren't dealing with an empty queue
                    bot.sendMessage({
                        to: channelID,
                        message: "The players currently raiding are"+qString
                    });
                } else if (raidQueue.length == 1) {
                    bot.sendMessage({
                        to: channelID,
                        message: "The only player raiding is"+qString
                    })
                }
                else { //If the queue *is* empty...
                    bot.sendMessage({ //Let the user know
                        to: channelID,
                        message: "Nobody is in the raiding queue! Go add some players!"
                    })
                }
            break;

            case 'qclear': //Clear the entire raid queue
                raidQueue = [];

                //Send the message
                bot.sendMessage({
                    to: channelID,
                    message: "The raiding queue has been cleared!"
                })
            break;

            case 'qremove': //ARG [PLAYERNAME] //Remove specific user from the queue
                for (var i = 0; i < raidQueue.length; i++) {
                    if (raidQueue[i] == args[1]) { //Player found in queue!
                        raidQueue.splice(i, 1); //Get rid of them
                    }
                }

                //Send the message
                bot.sendMessage({
                    to: channelID,
                    message: args[1] + " has been removed from the queue!"
                })
            break;

            //RAID COMMANDS//
            case 'raidstart': //ARG [TEMPLARS OR PALADINS] //Starts the raid calls
                if (!activeRaid && raidQueue.length > 0 && args[1] == "templars" || !activeRaid && raidQueue.length > 0 && args[1] == "paladins") {
                    activeRaid = true;
                    if (args[1] == "templars") {
                        currentID = templarID;
                    } else {
                        currentID = paladinID;
                    }
                    NOTIFY_CHANNEL = channelID;
                    bot.sendMessage({
                        to: channelID,
                        message: 'Starting the raid! Type "raidstop" to stop the raid. Callouts are made every ' +callTime+ ' seconds with a refresh time at the end of the queue set to ' +refreshTime+ ' seconds.'
                    });

                    timeInt = setInterval(time, 1000);
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Something went wrong! Make sure there is not an ongoing raid or an empty raid queue! Be sure to also specify "Templars" or "Paladins"!'
                    });
                }


            break;

            case 'raidstop': //Stops the raid calls
                if (activeRaid) {
                    activeRaid = false;
                    bot.sendMessage({
                        to: channelID,
                        message: 'The raid is over! Thanks everyone!'
                    });
                    clearInterval(timeInt);
                    timer = 0;
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'There is no ongoing raid!'
                    });
                }

            break;

            case 'calltime': //OPTIONAL ARG [SECONDS] //Set or check the call time
                if (isNaN(args[1])) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'The current call time is set to '+callTime+" seconds!"
                    })
                } else {
                    callTime = Number(args[1]);
                    bot.sendMessage({
                        to: channelID,
                        message: "The new call time is set to "+callTime+" seconds!"
                    })
                }


            break;

            case 'refreshtime': //OPTIONAL ARG [SECONDS] //Set or check the refresh time
                if (isNaN(args[1])) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'The current refresh time is set to '+refreshTime+" seconds!"
                    })
                } else {
                    refreshTime = Number(args[1]);
                    bot.sendMessage({
                        to: channelID,
                        message: "The new refresh time is set to "+refreshTime+" seconds!"
                    })
                }


            break;

            case 'skip': //OPTIONAL ARG [REFRESH] //Skips to the next call
                if (activeRaid) {
                    if (args[1] != 'refresh') {
                        timer = callTime;
                    } else {
                        timer = refreshTime;
                    }
                }

            break;

            case 'reset':
                timer = 0;
                bot.sendMessage({
                    to: channelID,
                    message: "Timer has been reset!"
                })

            break;

            case 'time':
                timer = 0;
                bot.sendMessage({
                    to: channelID,
                    message: "Timer is currently at "+timer+" seconds!"
                })

            break;

            case 'pause':
                clearInterval(timeInt);
                bot.sendMessage({
                    to: channelID,
                    message: "Raiding paused! Take it easy for a bit guys!"
                })

            break;

            case 'resume':
                timeInt = setInterval(time, 1000);
                bot.sendMessage({
                    to: channelID,
                    message: "Raiding has been resumed! Fight on Knights!"
                });

            break;

            //EXTRAS//
            case 'bop':
                if (!activeRaid) {
                    bot.sendMessage({
                        to: channelID,
                        message: "You can only use this command during an ongoing raid!"
                    });
                }


            break;


            case 'help': //Display all of our commands!
                bot.sendMessage({
                    to: channelID,
                    message: "Available commands:\n\n~q [PLAYER(S)]: Adds player(s) to the raid queue\n\n~qcheck: Lists all players queued\n\n~qclear: Removes all players from raid queue\n\n~qremove [PLAYER]: Removes player from the raid queue\n\n~raidstart [TEMPLARS/PALADINS]: Starts the raid callouts for the respective group\n\n~raidstop: Ends the raid callouts\n\n~calltime [SECONDS]: Resets call time in seconds. Leaving the argument empty will display current time.\n\n~refreshtime [SECONDS]: Same as above but for the refresh timer\n\n~skip: Skips to the next player in the raid queue. Does nothing if there is not a raid going on.\n\n~pause: Stops the timer\n\n~resume: Start the timer again\n\n~timer: Check the current time in seconds\n\n~reset: Sets timer to 0"
                });

            break;
         }
     } //og bot
});*/
bot.login(auth.token);
