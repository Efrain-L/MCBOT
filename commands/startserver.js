const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');
const net = require('net');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('startserver')
		.setDescription('Will start the Minecraft server.'),
	async execute(interaction) {
		await interaction.deferReply();
		if (await ping() === 'running') {
			await interaction.editReply('The server is already running');
		}
		else {
			await startServer();
			let time = 0;
			let started = false;
			while (time < 240) {
				console.log(`pinging (${time}s)...`);
				if (await ping() === 'running') {
					started = true;
					await interaction.editReply('Server has started.');
					break;
				}
				// sleeps for 5000 ms or 5 seconds
				await sleep(5000);
				time += 5;
			}
			if (!started) {
				await interaction.editReply('The server took too long to start.');
			}
		}
	},
};

async function startServer() {
	exec('tmux send -t 0:0 "sh run.sh" ENTER');
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const ping = async () => {
	return new Promise((resolve) => {
		const s = net.createServer();
		s.once('error', (err) => {
			s.close();
			if (err.code === 'EADDRINUSE') {
				resolve('running');
			}
			else {
				resolve('closed');
			}
		});
		s.once('listening', () => {
			resolve('closed');
			s.close();
		});
		s.listen({
			host: 'localhost',
			port: 25565,
		});
	});
};