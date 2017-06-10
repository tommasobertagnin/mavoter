const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({})
userSchema.plugin(passportLocalMongoose) //default fields: username, password

module.exports = mongoose.model('User', userSchema)