const Discord = require("discord.js");
const dotenv = require('dotenv');
const fs      = require('fs');
const axios = require('axios');
const config  = JSON.parse(fs.readFileSync('./src/config.json', 'utf8'));

dotenv.config();

const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Bot has started`);
    client.user.setActivity(`Member ärgern`);
  });

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "help"){
      if (message.member.roles.some(r=>["Admin", "Mod", "Team", "Member"].includes(r.name)) ) {
      let helpembed = new Discord.RichEmbed()
      .setDescription("__**Botbefehle (Nur im Botchannel möglich):**__")
      .setColor("#ff0000")
      .addField("Feuertermine:", "!feuer")
      .addField("Dungeontermine:", "!dungeons")
      .addField("Monster Item Drop Liste:", "!droplist")
      .addField("Magische Monster Liste (Feld):", "!magic")
      .addField("Würfeln (Nur im Würfelchat möglich):", "!roll")
      
      message.delete().catch(O_o=>{});

      return message.author.send("Deine Anfrage", helpembed);
    } else {
      return message.reply(" du kannst diese Funktion nicht nutzen!");
    }
  }
    
    if(command === "roll"){
        if (message.member.roles.some(r=>["Admin", "Mod", "Team", "Member"].includes(r.name)) ) {
        var myArray = ['__**1**__', '__**2**__', '__**3**__', '__**4**__', '__**5**__', '__**6**__'];    
        var item = myArray[(Math.random()*myArray.length)|0];
        message.delete().catch(O_o=>{});
        message.channel.send(message.author + " hat eine " + item + " gewürfelt!");
      } else {
        return message.reply(" du kannst diese Funktion nicht nutzen!");
      }
    }
    
 
    if(command === "purge") {
       
        if(message.member.id != config.owner)
          return message.reply(" du hast keine Rechte um diese Funktion zu nutzen!")
            
          const deleteCount = parseInt(args[0], 10);
        
        // Ooooh nice, combined conditions. <3
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");


        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
      };
  
  });
  


client.login(process.env.TOKEN)