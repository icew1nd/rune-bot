"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.io");
// Initialize Discord Bot
const bot = new Discord.Client({
    token: process.env.BOT_TOKEN,
    autorun: true
});
// Variables to store intervals in later
this.intervalReg = null;
this.interval = null;
// Write out a ready message after initializing
bot.on("ready", () => {
    console.log("Ready to roll!");
});
bot.on("message", (user, userID, channelID, message, evt) => {
    // The bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) === "!") {
        const args = message.substring(1).split(" ");
        const cmd = args[0];
        switch (cmd) {
            case "runesOn":
                // Sends a ready message to the channel the invoker is in
                bot.sendMessage({
                    to: channelID,
                    message: "Ready for roons! - https://i.imgur.com/8Oey2dx.png"
                });
                // Join the specified voice channel
                bot.joinVoiceChannel(process.env.VCID, (err, events) => {
                    if (err)
                        return console.error(err);
                    // Send a talk to speech message every 5 miuntes
                    this.interval = setInterval(() => {
                        bot.sendMessage({
                            to: channelID,
                            message: "RUNES",
                            tts: true
                        });
                    }, 300000);
                    // Send a regular message every 2 minutes to indicate a regular rune
                    this.intervalReg = setInterval(() => {
                        bot.sendMessage({
                            to: channelID,
                            message: "A regular rune appeared"
                        });
                    }, 120000);
                });
                break;
            case "runesOff":
                // Clear the auto intervalling messages
                clearInterval(this.interval);
                clearInterval(this.intervalReg);
                // Say goodbye
                bot.sendMessage({
                    to: channelID,
                    message: "Bye!"
                });
                // Leave the voice channel
                bot.leaveVoiceChannel(process.env.VCID, err => {
                    if (err)
                        return console.error(err);
                });
                break;
        }
    }
});
