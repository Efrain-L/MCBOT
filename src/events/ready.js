// Event where the bot/client is starting/logging in
const { Events } = require('discord.js');
const mongoose = require('mongoose');
const { mongoURI } = require('../../config.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        // If a URI for the database was not provided
        if (!mongoURI) {
            console.log('Missing database URI.');
            return;
        }
        // Connect to the database
        mongoose.connect(mongoURI, {
            keepAlive: true,
            useNewUrlParser: true,
        });
        // Bot is now connected to discord
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};