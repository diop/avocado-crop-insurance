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
RETURNING *`, farmerData
  )
}

const getActiveFarmersEthAdd = () => {
  const cur = new Date()
  const lastYear = `${cur.getUTCFullYear()}-${cur.getUTCMonth()}-${cur.getUTCDate()}`

  return db.query('SELECT ethaddress FROM farmers WHERE creationdate > $1', lastYear)
}

module.exports = { addFarmer, getActiveFarmersEthAdd }
