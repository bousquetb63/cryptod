const Discord = require('discord.js');
const fs = require('fs');
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
  console.log(`Reporting for duty! ${bot.user.username}`);
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
    let command = messageArray[0]
    let args = messageArray.slice(1);

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

    
    // switch (content) {
    // case 'giveaway':  
    //     message.reply('Maximum number of entries? (Timesout in 2 minutes)');
    //     // for(var i = 0; i < 10; i++){
    //     //     sleep(1000);
    //     //     message.channel.send(`${10-i} seconds left!`)
    //     // }
    //     break;
    // default:
    //     break;
    // }
});

bot.login('NDA4Mzg2MzUwNzA2OTgyOTEy.DVPTbg.7GbzBEub41DDJ73Olp0wiqqMgF8');