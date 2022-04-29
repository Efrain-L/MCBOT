import discord
import directories as dir
import botfunctions as bf

#Init discord client
client = discord.Client()
print('swag')

#Discord bot code
@client.event
async def on_message(message):

    #channel & author check
    if message.author == client.user:
        return
    if message.channel.id != dir.botChannel:
        return

    #help command
    if message.content.startswith('~help'):
        await bf.helpMessage(message)

    #ping server command
    if message.content.startswith('~pingserver'):
        await bf.pingServer(message)

    #start server command
    if message.content.startswith('~startserver'):
        await bf.startingServer(message)
    
    #option command
    if message.content.startswith('~options'):
        await bf.showOptions(message)

    #close server command works!!
    if message.content.startswith('~closeserver'):
        await bf.closingServer(message)

client.run('ODc5NTc3NTQ4NTY3MjI0MzUw.YSRwbQ.7rGLFzxOXYCVFYmErrLMm4cL2oA')