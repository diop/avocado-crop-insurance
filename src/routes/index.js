const express = require('express')
const app = express()

const router = express.Router()

app.get('/', (res, req, next) => {
  res.render('index')
})

module.exports = router
