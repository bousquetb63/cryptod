module.exports.run = async (bot, message, args) => {
    message.author.sendMessage(
      {embed: {
        color: 3447003,
        author: {
            icon_url: bot.user.avatarURL
        },
        title: "Heres a list of my commands and usage:",
        fields: [{
            name: "$help",
            value: "Usage: $help"
          },
          {
            name: "$crypto",
            value: "Usage: $crypto <Currency Name>\nExample: $crypto Bitcoin Cash"
          },
          {
            name: "$giveaway",
            value: "Usage: $giveaway <how many users can enter> <amount of time for entry>\nExample: Workin on it right now.."
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