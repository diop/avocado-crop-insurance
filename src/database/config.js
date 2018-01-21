const pgp = require('pg-promise')()

const connection = {
  host: 'localhost',
  database: 'farmers'
}

const db = pgp(process.env.DATABASE_URL || connection)

module.exports = db
