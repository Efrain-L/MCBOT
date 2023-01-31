// This file holds all of the methods related to starting/stopping and pinging the server
const net = require('net');
const { exec } = require('child_process');

// Server starter method
const serverStarter = async function(interaction, modPath) {
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
        await interaction.followUp('The server took too long to start.');
    }
}

// Executes the starting shell commands
const startCommand = async function(packPath) {
    exec(`tmux send -t 0:0 "cd ${packPath}" ENTER`);
    exec('tmux send -t 0:0 "sh run.sh" ENTER');
}

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
    serverStarter,
    startCommand,
    sleep,
    ping,
}