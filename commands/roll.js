const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (message.member.roles.some(r=>["Admin", "Mod", "Team", "Member"].includes(r.name)) ) {
        var myArray = ['__**1**__', '__**2**__', '__**3**__', '__**4**__', '__**5**__', '__**6**__'];    
        var item = myArray[(Math.random()*myArray.length)|0];
        message.delete().catch(O_o=>{});
        message.channel.send(message.author + " hat eine " + item + " gewürfelt!");
      } else {
        return message.reply(" du kannst diese Funktion nicht nutzen!");
      }
}