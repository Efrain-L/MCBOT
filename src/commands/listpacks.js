const { SlashCommandBuilder } = require('discord.js');
const { packs } = require('../server/utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listpacks')
        .setDescription('List of modpacks which can be loaded on the server.'),
    async execute(interaction) {
        let replyString = 'Here is a list of the modpacks on the server:\n';
        packs.forEach(pack => {
            replyString += `${pack.label}\n`;
        });
        await interaction.reply(replyString);
    },
};