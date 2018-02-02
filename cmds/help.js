module.exports.run = async (bot, message, args) => {
    message.author.send(
      {embed: {
        color: 3447003,
        title: "Heres a list of my commands and usage:",
        fields: [{
            name: "$help",
            value: "Usage: $help"
          },
          {
            name: "$pc",
            value: "Usage: $pc <Currency Name>\nExample: $pc Bitcoin Cash"
          },
          {
            name: "$<Cryptocurrency Symbol>",
            value: "Usage: $pc <Currency Name>\nExample: $btc"
          },
          {
            name: "$giveaway",
            value: "Usage: $giveaway <amount of time for entry>\nExample: Workin on it right now.."
          }
        ],
        timestamp: new Date(),
        footer: {
        icon_url: bot.user.avatarURL,
        text: "Made by Kulipie"
        }
      }})
}

module.exports.help = {
    name: "help",
    usage: "displays commands and usage"
}