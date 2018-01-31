const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const triggerSymbol = '$';

bot.on('ready', async () => {
  console.log(`Reporting for duty! ${bot.user.username}`);

  try {
      let link = await bot.generateInvite(["ADMINISTRATOR"]);
      console.log(link);
  } catch(e) {
      console.log(e.stack);
  }
});

// PM'ing bot
bot.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  message.reply(message.author);
  // Checks for trigger symbol 
  if (message.content[0] === triggerSymbol) {
    var content = message
        .content.substring(1, message.content.length)
        .toLowerCase();
    switch (content) {
        case 'help':
            message.reply('Hello!');
            break;
        default:
            break;
    }
  }
});

bot.login('NDA4Mzg2MzUwNzA2OTgyOTEy.DVPTbg.7GbzBEub41DDJ73Olp0wiqqMgF8');