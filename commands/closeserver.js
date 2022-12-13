const { SlashCommandBuilder } = require('discord.js');
const { ping } = require('./pingserver');
const { exec } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('closeserver')
		.setDescription('Will close the Minecraft server.'),
	async execute(interaction) {
		if (await ping() != 'running') {
			await interaction.reply('The server is already closed');
		}
		else {
			await interaction.reply('Closing the server...');
			await closeServer();
			let time = 0;
			let closed = false;
			while (time < 180) {
				console.log(`pinging (${time}s)...`);
				if (await ping() == 'closed') {
					await interaction.reply('The server has been closed');
					closed = true;
					break;
				}
				sleep(5000);
				time += 5;
			}
			if (!closed) {
				await interaction.reply('The server took too long to close.');
			}
		}
	},
};

async function closeServer() {
	exec('tmux send -t 0 "stop" ENTER');
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}