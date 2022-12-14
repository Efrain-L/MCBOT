const { SlashCommandBuilder } = require('discord.js');
const net = require('net');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pingserver')
		.setDescription('Check if the surver is currently running.'),
	async execute(interaction) {
		await interaction.deferReply();
		const msg = await ping();
		await interaction.editReply({ content: `The server is currently ${msg}` });
	},
};

const ping = async () => {
	return new Promise((resolve) => {
		const s = net.createServer();
		s.once('error', (err) => {
			s.close();
			// console.log(err.code);
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