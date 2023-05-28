// This file holds all of the methods related to pinging the server
const net = require('net');

// packName : packPath
const packs = new Map([
    ['Vault Hunters 3', '~/mcservers/vh3server'],
    ['All The Mods 8', '~/mcservers/All-The-Mods-8-Server-Files-1.0.17'],
    ['FTB University', '~/mcservers/FTB_University'],
    ['Rustic Waters II', '~/mcservers/RusticWatersII-1.16Server'],
    ['Roguelike Adventures and Dungeons 2', '~/mcservers/RAD2-Serverpack-1.3'],
]);

const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

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

// exporting each of the server methods
module.exports = {
    sleep,
    ping,
    packs,
};