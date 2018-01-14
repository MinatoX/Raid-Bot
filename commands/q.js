//ARG [PLAYERNAME] //Add a player to the queue
module.exports.run = async (bot, message, args,cfg) => { //this is what will run when the command is called.

    for (var i=0; i<args.length; i++) {

        if (args[i] == cfg.raidQueue[i]) { //Make sure the player isn't already in the queue

            cfg.dupe = true;
            message.channel.send("your in the raid party");
          }
    }

    if (args[0] != "" && !cfg.dupe) { //Let the user know their player was added to the queue!

        var addQ = ""; //The message our bot will be displaying

        if (args.length >= 2) {
            for (var i = 0; i < args.length; i++) { //Add multiple names if any
                cfg.raidQueue.push(args[i]);
                if (i != args.length-1) {
                    addQ = addQ+args[i]+", ";
                } else {
                    addQ = addQ+"and "+args[i];
                }
            }
            addQ = addQ+" have been added to the queue!";
        } else {
            cfg.raidQueue.push(args[0]);
            addQ = args[0] + " has been added to the queue!";
        }
        message.channel.send(addQ).catch(console.error);

    }


}

module.exports.config = { //this is the config for the command, you can add things to this such as proper usage, ect.(jaja)

}
