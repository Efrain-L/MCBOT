const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');
const { net } = require('net');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('startserver')
		.setDescription('Will start the Minecraft server.'),
	async execute(interaction) {
		if (await ping() === 'running') {
			await interaction.reply('The server is already running');
		}
		else {
			await startServer();
			let time = 0;
			let started = false;
			while (time < 180) {
				console.log(`pinging (${time}s)...`);
				if (await ping() == 'running') {
					started = true;
					await interaction.reply('Server has started.');
					break;
				}
				// sleeps for 5000 ms or 5 seconds
				await sleep(5000);
				time += 5;
			}
			if (!started) {
				await interaction.reply('The server took too long to start.');
			}
		}
	},
};

async function startServer() {
	exec('tmux send -t 0 "sh run.sh" ENTER');
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