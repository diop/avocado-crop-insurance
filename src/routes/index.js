const express = require('express')
const app = express()

const router = express.Router()

app.get('/', (res, req, next) => {
  response.render('index')
})

export module.exports = router
