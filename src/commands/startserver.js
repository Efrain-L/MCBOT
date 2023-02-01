const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
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
                        .setMinValues(1)
                        .setMaxValues(1)
                        .addOptions(
                            {
                                label: 'Vault Hunters',
                                value: '/home/opc/mcservers/vh3server',
                            },
                            {
                                label: 'Rustic Waters',
                                value: 'path2',
                            },
                        ),
                );
            await interaction.reply({ content: 'Select a Modpack to Start', components: [row] });
        }
    },
};