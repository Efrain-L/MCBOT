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

// Reading all of the command files
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

// Reading all of the event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
// Then setting up each of the events from the directory
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	// When an event occurs, it's execute function will be called
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Logging in using the authentication token
client.login(token);