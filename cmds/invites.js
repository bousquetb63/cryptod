module.exports.run = async (bot, message, args) => {
    var User = require("../models/user");

    console.log('entered invites');
    
    message.author.send('Checking invites....');
    
    User.find({username: message.author.Username, id: message.author.id}).exec(function(err, users){
        if (err) throw err;
        console.log(users);
        if(users.length === 0){
            var newUser = new User({
                invites: 0,
                username: message.author.Username,
                id: message.author.id
            });

            newUser.save(function(err) {
                if(err) throw err;
                console.log('new User saved');
                message.author.send('I see this is your first time using this commmand,\nwhen you create an invite link make sure to save it and use $redeem <invite link> to obtain ranks for invites!')
            });
        } else {
            message.author.send(`You currently have ${users[0].invites}`);
        }
    })
}

module.exports.help = {
    name: "invites",
    usage: "gives invite link and number of invites"
}