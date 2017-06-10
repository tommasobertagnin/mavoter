const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  admin: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)