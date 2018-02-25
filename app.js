const Discord = require('discord.js');
const fs = require('fs');
const cryptocurrencies = require('cryptocurrencies');
const sleep = require('system-sleep');
const bot = new Discord.Client({disableEveryone: true});
const settings = require('./settings.json');
const prefix = settings.public.commandPrefix;

// init bot commands
bot.commands = new Discord.Collection();
// load in bot commands
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

//Run when bot ready
bot.on('ready', async () => {
  console.log(`${bot.user.username} is Reporting for duty!`);
  bot.user.setActivity(`${prefix}help for list of cmds`)
  try {
      let link = await bot.generateInvite(["ADMINISTRATOR"]);
      console.log(link);
  } catch(e) {
      console.log(e.stack);
  }
});

// on member join
bot.on('guildMemberAdd', member => {
    member.addRole(member.guild.roles.find("name", "Members"));
    member.send({
        "embed": {
            "title": "Welcome to Crypto Community Hub!",
            "color": 9442302,
            "timestamp": "2018-02-17T05:04:05.742Z",
        
            "fields": [
            {
                "name": "Earn roles:",
                "value": "Use $ref <Username#Indentifier> message me who referred you **(Ex. $ref JonDoe#7040)** and get **2** free referal point!"
            },
            {
                "name": "Join in crypto discussions:",
                "value": "Join in engaging cryptocurrency related channels!"
            },
            {
                "name": "Ask questions:",
                "value": "Unsure what something is..?, ask away in the numerous channels available!"
            }
            ]
        }
    })
    // console.log(member.guild.members.find(member => member.user.username === 'kulipie', discriminator => member.user.discriminator === '7010').user);
});

// on message on server
bot.on('message', message => {
    if (message.content.includes(prefix + 'giveaway')){
        let adminRole = message.guild.roles.find("name", "Owner");
        if(!message.member.roles.has(adminRole.id)){
            return;
        }
    }
    // bans if sends discord link
    if(message.content.includes('di') && message.content.includes('cord') && message.content.includes('s') && message.content.includes('gg')){
        if(!message.member.roles.has(adminRole.id)){
            // let offender = message.guild.member(message.author);
            // offender.ban();
            message.delete();
            message.reply('Do not advertise!');
        }
        return;
    }


    //Checks if message is a command and not a dm
    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];

    let args = messageArray.slice(1);
    //If it is a cryptocurrency symbol after $ then run pc the crypto currency
    if(cryptocurrencies.symbols().includes(command.slice(prefix.length).toUpperCase())) {
        let cmd = bot.commands.get('pc');
        let symbol = command.slice(prefix.length).toUpperCase();
        if(cmd) cmd.run(bot, message, cryptocurrencies[symbol]);
    } else {
    //Otherwise run command
        let cmd = bot.commands.get(command.slice(prefix.length));
        if(cmd) cmd.run(bot, message, args);
    }
});
// login bot with token
bot.login(settings.secret.botToken);
