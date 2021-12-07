const express = require("express")

const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');

const { Permissions } = require('discord.js');

const client = new Discord.Client ();

const { Client, MessageAttachment, MessageEmbed } = require('discord.js');

const config = require('./config.json');

var servers = {};

const PREFIX = '.';

const { readdirSync } = require('fs');

const { join } = require('path');


client.commands= new Discord.Collection();
   


const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on('ready',() =>{
   console.log('This bot is online!');
   client.user.setActivity(`Minecraft!`, {type: "PLAYING"});  // You may change the bot's status here
   console.log("Powered by K4c3m")
})



 client.on("message", async message => {

      let args= message.content.substring(PREFIX.length).split(" ");
      if (!message.content.startsWith(PREFIX)) return;

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(PREFIX)) {
        const args = message.content.slice(PREFIX.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);
            

        } catch (error){
            console.error(error);
        }
    }
})

    client.login(config.BOT_TOKEN); // Add your bot token in config.json. If your code is public make sure to use .env instead.
