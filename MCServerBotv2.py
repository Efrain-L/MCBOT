import discord
import directories as dir
import botfunctions as bf

#Initialize discord client
intents = discord.Intents.all()
intents.messages = True
client = discord.Client()

#Discord bot code
@client.event
async def on_ready():
    print(f'Logged into discord as {client.user}')

@client.event
async def on_message(message):
    #channel & author check
    if message.author == client.user:
        return
    if message.channel.id not in dir.botChannels:
        return

    #command prefix
    if message.content.startswith('~'):
        #help command
        if message.content.startswith('~help'):
            await bf.helpMessage(message)

        #ping server command
        elif message.content.startswith('~pingserver'):
            await bf.pingServer(message)

        #start server command
        elif message.content.startswith('~startserver'):
            await bf.startingServer(message)
    
        #option command
        elif message.content.startswith('~options'):
            await bf.showOptions(message)

        #close server command works!!
        elif message.content.startswith('~closeserver'):
            await bf.closingServer(message)
        #not recognized command
        else:
            await message.channel.send('Command not recognized, use *~help* for valid commands')
            
client.run('ODc5NTc3NTQ4NTY3MjI0MzUw.YSRwbQ.7rGLFzxOXYCVFYmErrLMm4cL2oA')