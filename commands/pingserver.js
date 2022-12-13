const { SlashCommandBuilder } = require('discord.js');
const { net } = require('net');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pingserver')
		.setDescription('Check if the surver is currently running.'),
	async execute(interaction) {
		await interaction.reply('Pinging the server...');
		await interaction.reply(`The server is ${await ping()}`);
	},
};

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

// allowing other files to use this function
module.exports = { ping };