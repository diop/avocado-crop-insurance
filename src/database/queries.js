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
  region,
  elevation,
  longitude,
  latitude
)
VALUES (
  $[name],
  $[phonenumber],
  $[ethaddress],
  $[premium],
  $[technique],
  $[size],
  $[experience],
  $[region],
  $[elevation],
  $[longitude],
  $[latitude]
)
RETURNING *`, farmerData
  )
}

module.exports = { addFarmer }
