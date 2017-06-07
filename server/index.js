const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = require('express')()

require('dotenv').config()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const DB_URL = process.env.NODE_ENV === 'production'
  ? process.env.DB_URL_PRODUCTION
  : process.env.DB_URL_LOCAL

mongoose.connect(DB_URL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
  app.use('/', require('./routes'))
  app.use('/api/users', require('./api/users'))
  app.use('/api/polls', require('./api/polls'))
})

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is Live!')
})