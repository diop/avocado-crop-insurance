const express = require('express')
const bodyParser = require('body-parser')
const schedule = require('node-schedule')
const index = require('./routes/index')

const app = express()

const port = process.env.PORT || 3000

// schedule.scheduleJob('23 * * *', callApi())

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use(express.static('src/public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)

app.listen(port, () => {
  console.log('Listening for parties on port:', port)
})

module.exports = app
