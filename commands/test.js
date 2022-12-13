const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Test')
		.setDescription('Test if slash commands respond properly'),
	async execute(interaction) {
		await interaction.reply('Testing.');
	},
};