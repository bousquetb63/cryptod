const Discord = require('discord.js');
const fs = require('fs');
const cryptocurrencies = require('cryptocurrencies');
const sleep = require('system-sleep');
const bot = new Discord.Client({disableEveryone: true});
const prefix = '$';


bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log('No cmds to load!');
        return;
    }

    console.log(`Loading ${jsfiles.length} cmds!`);
    jsfiles.forEach((f, i)=> {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1} loaded...`);
        bot.commands.set(props.help.name, props);
    });
});


bot.on('ready', async () => {
  console.log(`${bot.user.username} is Reporting for duty!`);
  console.log(bot.commands);
  try {
      let link = await bot.generateInvite(["ADMINISTRATOR"]);
      console.log(link);
  } catch(e) {
      console.log(e.stack);
  }
});

// PM'ing bot
bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    console.log(cryptocurrencies[command.slice(prefix.length).toUpperCase()]);
    let args = messageArray.slice(1);
    if(cryptocurrencies.symbols().includes(command.slice(prefix.length).toUpperCase())) {
        let cmd = bot.commands.get('pc');
        let symbol = command.slice(prefix.length).toUpperCase();
        if(cmd) cmd.run(bot, message, cryptocurrencies[symbol]);
    } else {
        let cmd = bot.commands.get(command.slice(prefix.length));
        if(cmd) cmd.run(bot, message, args);
    }
});

bot.login('NDA5Mzk4NzI0Mjc2NTE4OTEy.DVeByQ.kn6s9S-88JdFlKH5O3sc3g7Rcm8');