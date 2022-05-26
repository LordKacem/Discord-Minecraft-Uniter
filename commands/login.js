const Discord = require('discord.js')
const config = require('../config.json');
module.exports = {
  name: 'login',
  category: 'Utility',
  description: 'Log into a minecraft server', // Log into the best SERVER
  usage: 'login',
  run: async(client, message, args) => {

let ign = args[0]
let server = args[1]

if(!ign){
    return message.channel.send("**Usage:** \`.login <Username> <Server_IP>\`")
}

if(!server){
    return message.channel.send("**Usage:** \`.login <Username> <Server_IP>\`")
}
const mineflayer = require('mineflayer')

function createBot() {

 const bot = mineflayer.createBot({
   host: server,
   port: 25565,
   username: ign,
   version: "1.8.9", //You can change the minecraft version here.
 
 })

 const bChannel = client.channels.cache.get(config.bot_channel)

      let chat = [];

      setInterval(() => {
        if (chat.length) {
          bChannel.send("```" + chat.join("\n") + "```");
          chat.length = 0;
        } else {
          return;
        }
      }, 1000);

bot.on('chat', (username, message) => {
    
    if(username === "Limit" || "ago" || ign) return;    
    if(message = "") return;

    chat.push(`\`${username}\` ➤ ${message}`);
    
  })

  bot.on('messagestr', (msg) => {

if(!msg) return;
if(msg.includes("You are currently disguised")) return;
    chat.push(`${msg}`);
    
  })

  bot.on('kicked', console.log)
  bot.on('error', (err) => console.log(err))
  bot.on('end', (username, message) => {
    bChannel.send("**🔴 Successfully Disconnected**")
  })
  bot.on('login', (username, message) => {
    bChannel.send("**🟢 Succseffully logged in **")
  })



client.on("message", async message => {
 
    if(message.author.bot) return;

    if((message.content === ".quit") && (message.channel.id === config.bot_channel)) {
        bot.quit()
        return bChannel.send("**Logging out...**")
    } else if(message.channel.id === config.bot_channel){
        bot.chat(message.content)
    }
  })
}
createBot() 
}
}
