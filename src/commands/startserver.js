const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const net = require('net');
const { ping } = require('../server/utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startserver')
        .setDescription('Will start the Minecraft server.'),
    async execute(interaction) {
        // await interaction.deferReply();
        if (await ping() === 'running') {
            await interaction.editReply('The server is already running');
        }
        // otherwise, present the user with the selection menu
        else {
            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('start-select')
                        .setPlaceholder('Nothing selected')
                        .addOptions(
                            new StringSelectMenuOptionBuilder({
                                label: 'Vault Hunters',
                                value: '/home/opc/mcservers/vh3server'
                            }),
                            new StringSelectMenuOptionBuilder({
                                label: 'All The Mods 8',
                                value: '/home/opc/mcservers/All-The-Mods-8-Server-Files-1.0.17'
                            })
                        ),
                );
            await interaction.reply({ content: 'Select a Modpack to Start', components: [row] });
        }
    },
};