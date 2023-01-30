// 'Imports'
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const { exec } = require('node:child_process');
const net = require('net');
const fs = require('node:fs');
const path = require('node:path');

// Getting discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Setting up slash commands from the corresponding files in the directory
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// For each of the files
for (const file of commandsFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Place each command into the client's commands collection
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	// Error handling for when a command does not have the required properties
	else {
		console.log(`The command at ${filePath} is missing a "data" or "execute" property.`);
	}
}

// When starting the bot
client.once(Events.ClientReady, c => {
	console.log(`Logged in as ${c.user.tag}.`);
});

// Slash commands are invoked through interactions
client.on(Events.InteractionCreate, async interaction => {
	// Exit if the interaction is a command
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
	else if (interaction.isStringSelectMenu()) {
		// If the interaction is selecting a modpack option
		if (interaction.customId === 'start-select') {
			await interaction.update({ content: 'Attempting to start the pack...', components: [] });
			let modPath = '';
			await interaction.values.forEach(async value => {
				modPath += `${value}`;
			});
			await startCommand(modPath);
			let time = 0;
			let started = false;
			while (time < 240) {
				// console.log(`pinging (${time}s)...`);
				if (await ping() === 'running') {
					started = true;
					await interaction.followUp('Server has started.');
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
	}
});

async function startCommand(packPath) {
	exec(`tmux send -t 0:0 "cd ${packPath}" ENTER`);
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

// Logging in using the authentication token
client.login(token);