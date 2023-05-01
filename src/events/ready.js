// Event where the bot/client is starting/logging in
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        // Bot is now connected to discord
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};