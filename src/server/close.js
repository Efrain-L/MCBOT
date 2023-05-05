// This file holds all of the methods related to stopping the server
const { exec } = require('child_process');
const { ping, sleep } = require('./utils');

const serverCloser = async function(interaction) {
    await closeCommand();
        let time = 0;
        let closed = false;
        while (time < 240) {
            if (await ping() === 'closed') {
                closed = true;
                await interaction.editReply('The server has been closed');
                break;
            }
            await sleep(5000);
            time += 5;
        }
        if (!closed) {
            await interaction.editReply('The server took too long to close.');
        }
}

async function closeCommand() {
    exec('tmux send -t 0:0 "stop" ENTER');
    await sleep(3000);
    exec('tmux send -t 0:0 ^c');
}

module.exports = {
    serverCloser,
}
