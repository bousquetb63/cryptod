const enterSymbol = "✅";
const rn = require('random-number');

module.exports.run = async (bot, message, args) => {
    if (args.length !== 1 || isNaN(parseInt(args[0]))) {
        message.channel.send("You didnt fill out all the parameters. Use $help for more information!");
        return;
    }
    let giveawayAnnounce = await message.channel.send('A giveaway was just started.\n React to this message with a :white_check_mark: to enter!');
    await giveawayAnnounce.react(enterSymbol);

    const reactions = await giveawayAnnounce.awaitReactions(reaction => reaction.emoji.name === enterSymbol, {time: args[0]*1000});
    let entries = await reactions.get(enterSymbol).users.keys();
    var options = {
        min:  1
      , max:  entries.length
      , integer: true
    }
    console.log(entries.get('1'));
    // let winner = reactions.get(enterSymbol).users.get(entries.get(rn(options).toString));
    // console.log(winner)
}

module.exports.help = {
    name: "giveaway",
    usage: "discord giveaways"
}