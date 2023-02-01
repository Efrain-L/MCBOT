const { SlashCommandBuilder } = require('discord.js');
const net = require('net');
const { ping } = require('../server/utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pingserver')
        .setDescription('Check if the surver is currently running.'),
    async execute(interaction) {
        await interaction.deferReply();
        const msg = await ping();
        await interaction.editReply({ content: `The server is currently ${msg}` });
    },
};