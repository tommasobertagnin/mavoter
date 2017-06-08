const mongoose = require('mongoose')
const Schema = mongoose.Schema

const optionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true
  }
})

const pollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  options: {
    type: [optionSchema],
    required: true,
    validate: {
      validator: options => options.length >= 2,
      message: 'The array should >= 2'
    }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Poll', pollSchema)
