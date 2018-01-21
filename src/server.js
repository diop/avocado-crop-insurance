const express = require('express')
const bodyParser = require('body-parser')
const schedule = require('node-schedule')
const index = require('./routes/index')
const { checkForCropFailure } = require('./utilities')

const app = express()

const port = process.env.PORT || 3000

// daily at the 23rd hour
schedule.scheduleJob('23 * * *', checkForCropFailure)

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use(express.static('src/public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)

app.listen(port, () => {
  console.log('Listening for parties on port:', port)
})

module.exports = app
