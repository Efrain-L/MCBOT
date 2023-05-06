// Event handler for the bot's interactions
const { Events } = require('discord.js');
const { serverStarter } = require('../server/start');

module.exports = {
    name: Events.InteractionCreate,
    // Slash commands are invoked through interactions
    async execute(interaction) {
        // Handler code for slash command interactions
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            // Error message when the command given is not a valid command
            if (!command) {
                console.error(`No command matches ${interaction.commandName} was found.`);
                return;
            }
            // Try to execute the command, catch if an error occured
            try {
                await command.execute(interaction);
            }
            catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error trying to execute this command', ephemeral: true });
            }
        }
        // Handler for selection menu interactions
        else if (interaction.isStringSelectMenu()) {
            // If the interaction is selecting a modpack option
            if (interaction.customId === 'start-select') {
                await interaction.update({ content: 'Attempting to start the server with the selected modpack...', components: [] });
                let modPath = '';
                // Get the path from the selection's value
                await interaction.values.forEach(async value => {
                    modPath += `${value}`;
                });
                // Once the path has been retrieved, call the starter method
                await serverStarter(interaction, modPath);
            }
        }
    },
};