// This file holds all of the methods related to starting the server
const { exec } = require('child_process');
const { ping, sleep } = require('./utils');

// Server starter method
const serverStarter = async function(interaction, modPath) {
    await startCommand(modPath);
    let time = 0;
    let started = false;
    while (time < 240) {
        // console.log(`pinging (${time}s)...`);
        if (await ping() === 'running') {
            started = true;
            await interaction.editReply('Server has started.');
            break;
        }
        // sleeps for 5000 ms or 5 seconds
        await sleep(5000);
        time += 5;
    }
    if (!started) {
        await interaction.editReply('The server took too long to start.');
    }
};

// Executes the starting shell commands
const startCommand = async function(packPath) {
    exec(`tmux send -t 0:0 "cd ${packPath}" ENTER`);
    exec('tmux send -t 0:0 "sh run.sh" ENTER');
};

module.exports = {
    serverStarter,
};