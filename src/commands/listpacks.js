const { SlashCommandBuilder } = require('discord.js');
const { packs } = require('../server/utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listpacks')
        .setDescription('List of modpacks which can be loaded on the server.'),
    async execute(interaction) {
        replyString = 'Here is a list of the modpacks on the server:\n';
        packs.forEach(packOption => {
            replyString += `${packOption.label}\n`;
        });
        await interaction.reply(replyString);
    },
};