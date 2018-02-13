// mongoose, mongodb
var mongo = require('mongodb');
const settings = require('../settings.json');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InviteSchema = new Schema({
    invites: Number,
    code: String,
    id: String
});

var Invite = mongoose.model('Invite', InviteSchema);
console.log('DB done.')
module.exports = Invite;