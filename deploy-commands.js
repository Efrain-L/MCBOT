// Script to register the commands using the specified client and guild (discord server) from the config file
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
// const token = process.env.token;
const fs = require('node:fs');

console.log(typeof clientId);

const commands = [];
// Getting each of the commands from the directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Getting the SlashCommandBuilder#toJSON() output of each command's data into the commands array
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// Deploying each of the commands
console.log('swag');
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        // Deploying the commands to the bot's client and for each guild
        // eslint-disable-next-line no-unused-vars
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), { body: commands },
        );
        console.log('Successfully reloaded slash commands.');
    }
    catch (error) {
        // catching any errors
        console.error(error);
    }
})();