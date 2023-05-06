// This file holds all of the methods related to pinging the server
const { StringSelectMenuOptionBuilder } = require('discord.js');
const net = require('net');

const packs = [
    {
        label: 'Vault Hunters 3',
        value: '/home/opc/mcservers/vh3server'
    },
    {
        label: 'All The Mods 8',
        value: '/home/opc/mcservers/All-The-Mods-8-Server-Files-1.0.17'
    }
];

const sleep = function(ms) {
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
}

// exporting each of the server methods
module.exports = {
    sleep,
    ping,
    packs,
}