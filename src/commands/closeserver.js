const { SlashCommandBuilder } = require('discord.js');
const { ping } = require('../server/utils');
const { serverCloser } = require('../server/close');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('closeserver')
        .setDescription('Will close the Minecraft server.'),
    async execute(interaction) {
        await interaction.deferReply();
        if (await ping() !== 'running') {
            await interaction.editReply('The server is already closed');
        }
        else {
            await serverCloser(interaction);
        }
    },
};