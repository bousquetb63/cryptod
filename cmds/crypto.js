module.exports.run = async (bot, message, args) => {
    const request = require('superagent');
    const currencyFormatter = require('currency-formatter');
    let cryptoName = "";
    // console.log(args.length)
    if (args.length > 1) {
        // console.log('entered array')
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
    request
        .get(`https://api.coinmarketcap.com/v1/ticker/${cryptoName}/`)
        .end((err, res)=> {
            if (res.status == 404) {
                message.channel.send(`Encountered error when seaching for ${data.name}! Please check spelling.`);
                return;
            }
            console.log(res.body);
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
                    value: "Market Cap: " + mc
                  }
                ],
            }});
        });
    // axios({
    //     method:'get',
    //     url:`https://api.coinmarketcap.com/v1/ticker/${cryptoName}/`,
    //     responseType:'stream'
    //   })
    //     .then(function(response) {
    //         if(response.err == "id not found"){
    //             message.channel.send(`Encountered error when seaching for ${data.name}! Please check spelling.`);
    //             return;
    //         }
    //         // let data = response[0];
    //         console.log(response.data.res);
    //         // message.channel.send(`${data.name} is currently $${data.price_usd} and rank ${data.rank}!`);
    //   })
    //     .catch(function(error){
    //         message.channel.send(`Encountered error when seaching for ${data.name}! Please check spelling.`);
    //   });
    // console.log(args);
    
}

module.exports.help = {
    name: "crypto",
    usage: "gets crypto prices"
}