const db = require('./config')

const addFarmer = (farmerData) => {
  return db.query(
`INSERT INTO farmers (
  name,
  phonenumber,
  ethaddress,
  premium,
  technique,
  size,
  experience
)
VALUES (
  $[name],
  $[phonenumber],
  $[ethaddress],
  $[premium],
  $[technique],
  $[size],
  $[experience]
)
RETURNING *;`, farmerData
  )
}

const getActiveFarmersEthAdd = () => {
  const cur = new Date()
  const lastYear = `${cur.getUTCFullYear()}-${cur.getUTCMonth() + 1}-${cur.getUTCDate()}`

  return db.query('SELECT ethaddress FROM farmers WHERE creationdate > $1;', lastYear)
}

const getFarmerByAddress = (address) => {
  return db.one('SELECT * FROM farmers WHERE ethaddress=$1;', address)
}

module.exports = { addFarmer, getActiveFarmersEthAdd, getFarmerByAddress }
