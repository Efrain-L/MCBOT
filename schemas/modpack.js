const { model, Schema } = require('mongoose');

// Defining the schema for a modpack in the database
const modPackSchema = new Schema({
    packName: String,
	filePath: String,
	ready: Boolean,
});

module.exports = model('Modpack', modPackSchema);