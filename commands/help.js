const Discord = require('discord.js');

exports.run = (client, message, args) => {
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