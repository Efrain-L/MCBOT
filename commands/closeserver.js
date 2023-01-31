const { SlashCommandBuilder } = require('discord.js');
const { ping, sleep } = require('../server');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('closeserver')
        .setDescription('Will close the Minecraft server.'),
    async execute(interaction) {
        await interaction.deferReply();
        if (await ping() !== 'running') {
            await interaction.editReply('The server is already closed');
        }
        else {
            await closeCommand();
            let time = 0;
            let closed = false;
            while (time < 240) {
                // console.log(`pinging (${time}s)...`);
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
    },
};

async function closeCommand() {
    exec('tmux send -t 0:0 "stop" ENTER');
    await sleep(3000);
    exec('tmux send -t 0:0 ^z');
}