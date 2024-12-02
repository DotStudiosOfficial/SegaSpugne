const { Client, IntentsBitField } = require('discord.js');
const mongoose = require('mongoose');
const Discord = require('discord.js');
require('dotenv').config();
const fs = require("fs");

global.client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.commands = new Discord.Collection()
const commandsFolder = fs.readdirSync("./src/commands")
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./src/commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
};

const eventsFolder = fs.readdirSync("./src/events")
for (const folder of eventsFolder) {
    const eventsFiles = fs.readdirSync(`./src/events/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of eventsFiles) {
        const event = require(`./src/events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args))
    }
};

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return
    const command = client.commands.get(interaction.commandName)
    if (!command) return
    command.execute(interaction, client)
});

client.on('ready', async () => {
    mongoose.connect(process.env.URI).then(() => {
        console.log('MongoDB has been connected!')
    });
});

client.login(process.env.TOKEN);

console.clear();