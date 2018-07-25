exports.run = async (client, message, args) => {
       
    if (!message.member.roles.some(r=>["Admin"].includes(r.name)) )
          return message.reply(" du hast keine Rechte um diese Funktion zu nutzen!")
            
          const deleteCount = parseInt(args[0], 10);
        
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  
  };