const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = require('express')()

require('dotenv').config()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes'))
app.use('/api/users', require('./api/users'))
app.use('/api/polls', require('./api/polls'))

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is Live!')
})