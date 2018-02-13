// mongoose, mongodb
var mongo = require('mongodb');
const settings = require('../settings.json');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    invites: Number,
    username: String,
    id: String
});

var User = mongoose.model('User', UserSchema);
console.log('DB done.')
module.exports = User;