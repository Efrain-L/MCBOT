const Modpack = require('./modpack');
// This script will manually add a new modpack to the database
Modpack.create({
    packName: 'Vault Hunters 3',
    filePath: '~/mcservers/vh3server',
    ready: true
});