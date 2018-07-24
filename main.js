const Discord = require('discord.js')
const dotenv  = require('dotenv')
const axios   = require('axios')
const fs      = require('fs')
const config  = JSON.parse(fs.readFileSync('./src/config.json', 'utf8'))
const http = require('http')
const express = require('express')
const app = express()

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received")
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
}, 280000);

dotenv.config();

var client = new Discord.Client()


client.on('ready', () => {
    console.log('Logged in as', client.user.username, '...')
})


var cmdmap = {
    help: cmd_help
}

function cmd_help(msg, args){
    msg.channel.send('Hallo zusammen')
}


client.on('message', (msg) => {
    var cont = msg.content,
        author = msg.member,
        chan = msg.channel,
        guild = msg.guild

    if(author.id != client.user.id && cont.startsWith(config.prefix)) {
        var invoke = cont.split(' ')[0].substr(config.prefix.length),
            args   = cont.split(' ').slice(1)

        if (invoke in cmdmap) {
            cmdmap[invoke](msg, args)
        }
    }
})

client.login(process.env.TOKEN)