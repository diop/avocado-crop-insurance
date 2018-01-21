const express = require('express')
const { addFarmer } = require('../database/queries')

const app = express()

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

router.post('/', (req, res) => {
  addFarmer(req.body)
    .then(() => {
      res.send('success')
    })
    .catch(console.error)
})

module.exports = router
