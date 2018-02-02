module.exports.run = async (bot, message, args) => {
    const request = require('superagent');
    const currencyFormatter = require('currency-formatter');
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
    }
    request
        .get(`https://api.coinmarketcap.com/v1/ticker/${cryptoName}/`)
        .end((err, res)=> {
            if (res.status == 404) {
                message.channel.send(`Encountered error when seaching for ${cryptoName}! Please check spelling.`);
                return;
            }
            let data = res.body[0];
            let price = currencyFormatter.format(data.price_usd, { code: 'USD' });
            let mc = currencyFormatter.format(data.market_cap_usd, { code: 'USD' });
            
            message.channel.send({embed: {
                 color: 3447003, 
                 title: "According to CoinMarketCap",
                 url: "https://coinmarketcap.com/currencies/" + cryptoName,
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
                text: "CryptoD"
                }
            }});
        });
}

module.exports.help = {
    name: "pc",
    usage: "gets crypto prices"
}