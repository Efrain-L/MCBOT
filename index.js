// 'Imports'
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
// const token = process.env.token;

// command files
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
	// Exit if the interaction is not chat input
	if (!interaction.isChatInputCommand()) return;

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
});

// Logging in using the authentication token
client.login(token);