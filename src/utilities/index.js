const { getActiveFarmersEthAdd } = require('../database/queries')
const { getWeatherInfo } = require('../api')

const checkForCropFailure = () => {
  // call api
  // if temp above *
  getActiveFarmersEthAdd()
    .then(addresses => {
      addresses.forEach(address => {
        // call contract pay method
      })
    })
    .catch(console.error)
}

module.exports = { checkForCropFailure }
