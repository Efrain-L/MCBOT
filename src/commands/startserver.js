const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { ping, packs } = require('../server/utils');

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
            const packOptions = Array.from(packs.keys());
            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('start-select')
                        .setPlaceholder('Nothing selected')
                        .addOptions(
                            ...packOptions.map((packName) => (
                                new StringSelectMenuOptionBuilder()
                                    .setLabel(packName)
                                    .setValue(packName)
                            )),
                        ),
                );
            await interaction.reply({ content: 'Select a Modpack to Start', components: [row] });
        }
    },
};