const express = require('express')
const moment = require('moment')
const { addFarmer } = require('../database/queries')

const app = express()

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

router.post('/', (req, res) => {
  addFarmer(req.body)
    .then(() => {
      const nextYear = moment().add(1, 'year').format('YYYY-MM-DD')
      res.send(`<html><h1>Success! Your policy is effective until ${nextYear}</h1></html>`)
    })
    .catch(console.error)
})

module.exports = router
