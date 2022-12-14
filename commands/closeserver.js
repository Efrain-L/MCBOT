const { SlashCommandBuilder } = require('discord.js');
const { net } = require('net');
const { exec } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('closeserver')
		.setDescription('Will close the Minecraft server.'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		if (await ping() != 'running') {
			await interaction.editReply('The server is already closed');
		}
		else {
			await closeServer();
			let time = 0;
			let closed = false;
			while (time < 180) {
				console.log(`pinging (${time}s)...`);
				if (await ping() == 'closed') {
					closed = true;
					await interaction.editReply('The server has been closed');
					break;
				}
				sleep(5000);
				time += 5;
			}
			if (!closed) {
				await interaction.editReply('The server took too long to close.');
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

async function ping() {
	const server = net.createServer();
	// if the port is being used
	server.once('error', function(err) {
		if (err.code === 'EADDRINUSE') {
			return 'running';
		}
	});
	// if the port is not being used
	server.once('listening', function() {
		server.close();
		return 'closed';
	});
	// listen to the port
	server.listen({
		host: 'localhost',
		port: 25565,
	});
}