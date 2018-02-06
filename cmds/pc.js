const request = require('superagent');
const currencyFormatter = require('currency-formatter');
const cryptocurrencies = require('cryptocurrencies');

module.exports.run = async (bot, message, args) => {

    let cryptoName = "";
    if(typeof args !== 'string'){
        if (args.length > 1) {
            args.forEach(function(element) {
                if(cryptoName === "") {
                    cryptoName += element;
                } else {
                    cryptoName += "-" + element;
                }
            });
        } else {
            cryptoName = args[0];
        }
    } else {
        cryptoName = args;
    }
    let url = 'https://api.coinmarketcap.com/v1/ticker/' + cryptoName + '/';
    request
        .get(url)
        .end((err, res)=> {
            if (res.status == 404) {
                message.channel.send(`Encountered error when seaching for ${cryptoName}! Please check spelling.`);
                return;
            }
            let data = res.body[0];
            // console.log(data);
            let price = currencyFormatter.format(data.price_usd, { code: 'USD' });
            let mc = currencyFormatter.format(data.market_cap_usd, { code: 'USD' });
            
            message.channel.send({embed: {
                 color: 3447003, 
                 title: "According to CoinMarketCap",
                 url: "https://api.coinmarketcap.com/v1/ticker/" + cryptoName,
                 description: `***Pricing information for ${cryptoName} [${data.symbol}]:***`,
                 fields: [{
                    name: "**__Rank__**:",
                    value: data.rank
                  },
                  {
                    name: "**__Price__**:",
                    value: "USD: " + price + "\nBTC: " + data.price_btc,
                  },
                  {
                    name: "**__Market Cap__**:",
                    value:  mc
                  }
                ],
                timestamp: new Date(),
                footer: {
                icon_url: bot.user.avatarURL,
                text: "Offical Bot"
                }
            }});
        });
}

module.exports.help = {
    name: "pc",
    usage: "gets crypto prices"
}