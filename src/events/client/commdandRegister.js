const { SlashCommandBuilder, ApplicationCommandOptionType : {User, Number, String, Attachment, Channel, Boolean },  SlashCommandSubcommandBuilder } = require('discord.js');

global.cmd = [
    {
        name: 'stats',
        description: 'see your profile or an user one',
        options: [
            {
                name: 'user',
                description: 'the user who you want so see the profile',
                type: User,
                required: false,
            },
        ],
    },
];

const RegisterCommands = true;

module.exports = {
    name: 'ready',
    async execute(client) {
        if (RegisterCommands == true) client.application.commands.set(cmd).then(() => {
            console.log(`I comandi sono stati registrati in ${client.guilds.cache.size} servers`);
        }).catch(console.error);
    },
};