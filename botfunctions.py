#This file contains the functions to be used by the bot
import socket
import subprocess
import time
import directories as dir

#ping local ip address with port 25565
def checkServerPort():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    addressPort = ("10.0.0.192", 25565)
    checkSocket = sock.connect_ex(addressPort)
    sock.close()
    return checkSocket

#start pinging
async def pingServer(message):
    await message.channel.send('Attempting to Ping Server...')
    if checkServerPort() == 0:
        await message.channel.send('The Server is Open.')
    else:
        await message.channel.send("The Server is Closed.")

#send list of commands
async def helpMessage(message):
    await message.channel.send('The following commands are ~pingserver, ~startserver *serverName*, ~closeserver, and ~options.')

#starting server with specified choice
async def startingServer(message):
    if checkServerPort() == 0:
        await message.channel.send("The Server is Already Running/Starting.")
    else:   
        #Server selection
        serverFound = False
        commandList = message.content.split()
        if len(commandList) < 2:
            await message.channel.send('Please specify the server you would like to start. (Enter ~options to see the server list.)')
        else:
            #search for server entered
            searchfile = dir.serverList.get(commandList[1])
            if searchfile != None:
                serverFound = True
                await message.channel.send(f'Attempting to start the {commandList[1]} server...')
                ##print(searchfile)
                subprocess.Popen(searchfile, creationflags=subprocess.CREATE_NEW_CONSOLE)
                #Starting server loop
                maxTime = 0
                while checkServerPort() != 0 and maxTime != 180:
                    time.sleep(5)
                    maxTime += 5
                    print(maxTime)
                if checkServerPort() == 0:
                    await message.channel.send("The Server is now ready.")
                else:
                    await message.channel.send("The Server did not start in time (3 min elapsed).")
            #not found msg
            if serverFound == False:
                await message.channel.send('Could not find the server you searched for.')

#showing the list of server
async def showOptions(message):
    srvrNum = 0
    await message.channel.send('The list of servers:')
    for eachOpt in dir.serverList:
        srvrNum += 1
        await message.channel.send(f'*{srvrNum}: {eachOpt}*')

#attempt to close the currently running server
async def closingServer(message):
    if message.author.id in dir.validUsers:
        if dir.checkServerPort() == 0:
            await message.channel.send('Closing the server...')
            subprocess.Popen(dir.closeFile)
            time.sleep(5)
            await message.channel.send('The Server has Been Closed')
        else:
            await message.channel.send("The Server is already closed.")
    else:
        await message.channel.send("You do not have permission to use this command.")