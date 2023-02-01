const mongoose = require('mongoose');
const { mongoURI } = require('../../config.json');
const Modpack = require('./modpack');
// This script will manually add a new modpack to the database
mongoose.connect(mongoURI, {
    keepAlive: true,
    useNewUrlParser: true,
});
Modpack.create({
    packName: 'Vault Hunters 3',
    filePath: '~/mcservers/vh3server',
    ready: true
});