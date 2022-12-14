const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');
const net = require('net');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('closeserver')
		.setDescription('Will close the Minecraft server.'),
	async execute(interaction) {
		await interaction.deferReply();
		if (await ping() !== 'running') {
			await interaction.editReply('The server is already closed');
		}
		else {
			await closeServer();
			let time = 0;
			let closed = false;
			while (time < 240) {
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
	exec('tmux send -t 0:0 "stop" ENTER');
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const ping = async () => {
	return new Promise((resolve) => {
		const s = net.createServer();
		s.once('error', (err) => {
			s.close();
			if (err.code === 'EADDRNOTAVAIL') {
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
			host: '150.230.35.105',
			port: 25565,
		});
	});
};