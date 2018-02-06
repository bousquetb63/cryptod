const enterSymbol = "✅";
const sleep = require('system-sleep');
var moment = require('moment');

module.exports.run = async (bot, message, args) => {
    
    if (args.length !== 1 || isNaN(parseInt(args[0]))) {
        message.channel.send("You didnt fill out all the parameters. Use $help for more information!");
        return;
    }
    var toNormalHours = (hours) => {
        if(hours > 12){
            return hours-12;
        } else {
            return hours;
        }
    }
    var toNormalMinutes = (minutes) => {
        if (minutes < 10) {
            return "0" + minutes;
        } else {
            return minutes;
        }
    }
    var giveawayEndTime = (minutes) => {
        let end = moment().add(minutes, 'm');
        let hour = toNormalHours(end.hours());
        let minute = toNormalMinutes(end.minutes());
        return `${hour}:${minute}`;
    }
    countdownMessage()
    let giveawayAnnounce = await message.channel.send({
        "embed": {
          "title": ":tada: **__A Giveaway has started!__** :tada:",
          "color": 12390624,
          "footer": {
            "text": `Started at ${toNormalHours(moment().hours())}:${toNormalMinutes(moment().minutes())}`
          },
          "image": {
            "url": "https://image.prntscr.com/image/LD2JTcuOSNO2s-NFHf-lzQ.png"
          },
          "fields": [
            {
              "name": "Dont miss your chance to win!",
              "value": `This giveaway ends at ${giveawayEndTime(args[0])}, so don't forget to enter!`
            },
            {
              "name": "How to enter?",
              "value": "React to this message with a :white_check_mark:"
            }
          ]
        }
      });
    await giveawayAnnounce.react(enterSymbol);
    const reactions = await giveawayAnnounce.awaitReactions(reaction => reaction.emoji.name === enterSymbol, {time: args[0]*60000});
    let reactInfo = await reactions.get(enterSymbol);
    let entries = reactInfo.users;
    function generateRandomNumber(max) {
        let num = Math.floor(Math.random() * max) + 1;
        if(num === 0){
            num++;
        }
        if(num > reactInfo.count-1){
            num--;
        }
        return num;
    }
    let winningNumber = generateRandomNumber(reactInfo.count);
    let currentNumber = 0;
    function getWinner(value, key, map) {
        if(currentNumber == winningNumber){
            currentNumber++;
            message.channel.send("Times up! The winner is...");
            sleep(2000);
            message.channel.send("" + entries.get(key));
            return;
        } else {
            currentNumber++;
        }
        console.log(`m[${key}] = ${value}`);
    }
    entries.forEach(getWinner);
}
module.exports.help = {
    name: "giveaway",
    usage: "discord giveaways"
}