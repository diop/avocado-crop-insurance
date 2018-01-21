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
  experience,
  email
)
VALUES (
  $[name],
  $[phonenumber],
  $[ethaddress],
  $[premium],
  $[technique],
  $[size],
  $[experience],
  $[email]
)
RETURNING *;`, farmerData
  )
}

const getActiveFarmersEthAdd = () => {
  const cur = new Date()
  const lastYear = `${cur.getUTCFullYear() - 1}-${cur.getUTCMonth() + 1}-${cur.getUTCDate()}`

  return db.query('SELECT ethaddress FROM farmers WHERE creationdate >= $1 AND paid = FALSE;', lastYear)
}

const getFarmerByAddress = (address) => {
  return db.one('SELECT * FROM farmers WHERE ethaddress = $1;', address)
}

const deactivateFarmer = (address) => {
  return db.query('UPDATE farmers SET paid = TRUE WHERE ethaddress = $1', address)
}

module.exports = {
  addFarmer,
  getActiveFarmersEthAdd,
  getFarmerByAddress,
  deactivateFarmer
}
