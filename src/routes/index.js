const express = require('express')
const app = express()

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

router.post('/', (req, res) => {
  console.log('req.body:', req.body)
})

module.exports = router
