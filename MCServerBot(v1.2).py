import discord
import socket
import subprocess
import time

#Functions and variables
def checkServerPort():
    a_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    location = ("10.0.0.192", 25565)
    result_of_check = a_socket.connect_ex(location)
    a_socket.close()
    return result_of_check
botChannel = 880520345348628501
serverFile = r'C:\Users\efrai\Desktop\Minecraft\Server Files\Enigmatica6Server-0.5.9\start-server.bat'
print('swag')

#Discord bot code
client = discord.Client()
async def on_ready():
    print('The bot has logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return
    if message.channel.id != botChannel:
        return
    #help command
    if message.content.startswith('~help'):
        await message.channel.send('The two commands are ~pingserver, and ~startserver.')
    #ping server command
    if message.content.startswith('~pingserver'):
        await message.channel.send('Attempting to Ping Server...')
        if checkServerPort() == 0:
            await message.channel.send('The Server is Open.')
        else:
            await message.channel.send("The Server is Closed.")
    #start server command
    if message.content.startswith('~startserver'):
        await message.channel.send("Attempting to Start the Server...")
        if checkServerPort() == 0:
            await message.channel.send("The Server is Already Running/Starting.")
        else:
            await message.channel.send("Starting Server... (wait a few minutes for startup).")
            subprocess.Popen(serverFile, creationflags=subprocess.CREATE_NEW_CONSOLE)      
            #Starting server loop
            maxTime = 0
            while checkServerPort() != 0 and maxTime != 300:
                time.sleep(5)
                maxTime += 5
                print(maxTime)
            if checkServerPort() == 0:
                await message.channel.send("The Server is now ready.")
            else:
                await message.channel.send("The Server did not start in time (5 min elapsed).")
    #close server command works!!
    if message.content.startswith('~closeserver'):
        if checkServerPort() != 0:
            await message.channel.send('Closing the server...')
            subprocess.Popen(r"C:\VSCode\Pythons\MCBOT\serverclose.exe")
            time.sleep(5)
            await message.channel.send('The Server has Been Closed')
        else:
            await message.channel.send("The Server is already closed.")

client.run('ODc5NTc3NTQ4NTY3MjI0MzUw.YSRwbQ.7rGLFzxOXYCVFYmErrLMm4cL2oA')
