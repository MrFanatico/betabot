const Discord = require('discord.js');
const dotenv = require('dotenv');
const client = new Discord.Client();

dotenv.config();

const prefix = '!';
const ownerID = '218296560088383488';

client.on('message', message => {
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd  = args.shift().toLowerCase();

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  try {
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];

    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args);
  }catch (e) {
    console.log(e.stack);
  }
});

client.on('ready', () => console.log('Bot ist online!'));


client.login(process.env.TOKEN)