const express = require('express')
const app = express()
const bodyParser = 'body-parser'

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use(express.static('src/public'))

// app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/', index)

app.listen(port, () => {
  console.log('Listening for parties on port:', port)
})

module.exports = app
