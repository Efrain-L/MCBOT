// This file holds all of the methods related to pinging the server
const net = require('net');

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
}